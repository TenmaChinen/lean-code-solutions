import { tagColors } from '../tag-colors.js';

let lastSelectedEl = null;

export default function createTagMenuSelector( tagList, selectorHandlers ) {
    
    const tagMenuSelector = document.createElement( 'div' );
    tagMenuSelector.id = 'tag-menu-selector';
    tagMenuSelector.addEventListener( 'click', handleOnSelect );

    createItems( tagMenuSelector, tagList, selectorHandlers );
    updateTagMenuState( tagMenuSelector );
    return tagMenuSelector;
}

function createItems( parent, tags, selectorHandlers ) {
    const { handleClickBtnEdit, handleCheckedTagsChanged} = selectorHandlers;

    const ulEl = createUl( parent );
    for ( const tag of tags ) {
        const li = createLi( ulEl );
        const [ checkboxEl, labelEl, btnEditEl ] = createCheckboxDiv( li, tag );

        const subItems = tag.tags;
        const hasSubItems = subItems != null;

        let subCheckboxElArray = null;
        let subUlEl = null;

        if ( hasSubItems ) {
            subUlEl = createItems( li, subItems, selectorHandlers );
            subCheckboxElArray = subUlEl.querySelectorAll( 'input[type=checkbox]' );
        }

        labelEl.addEventListener( 'click', event => {
            if ( hasSubItems ) {
                subUlEl.classList.toggle( 'unfolded' );
                labelEl.classList.toggle( 'arrow-down' );
            }
            handleOnSelect( event );
        } );

        checkboxEl.addEventListener( 'change', event => {
            if ( hasSubItems ) {
                // Check-Uncheck Children from Parent
                subCheckboxElArray.forEach( subCheckboxEl => {
                    subCheckboxEl.checked = checkboxEl.checked;
                } );
            }

            // Check Parent when Child is Checked
            const groupId = checkboxEl.getAttribute( 'groupId' );
            if ( checkboxEl.checked ) {
                // console.log( groupId, checkboxEl );
                checkGroupIfAny( groupId );
            } else {
                uncheckGroupIfEmpty( groupId );
            }

            handleCheckedTagsChanged();
        } );

        btnEditEl.addEventListener( 'click', e => handleClickBtnEdit( tag ) );
    }
    return ulEl;
}

function handleOnSelect( event ) {
    const selectedEl = event.target;
    if ( selectedEl != lastSelectedEl ) {
        if ( lastSelectedEl ) {
            lastSelectedEl.classList.toggle( 'selected' );
        }
        selectedEl.classList.toggle( 'selected' );
        lastSelectedEl = selectedEl;
    }
}


// Recursive Functions To Cover all the tree of Check Uncheck of Groups

function checkGroupIfAny( groupId ) {
    if ( groupId ) {
        const groupCheckboxEl = document.querySelector( `#${groupId}` );
        groupCheckboxEl.checked = true;
        const parentGroupId = groupCheckboxEl.getAttribute( 'groupId' );
        checkGroupIfAny( parentGroupId );
    }
}

function uncheckGroupIfEmpty( groupId ) {
    if ( groupId ) {
        const groupCheckboxEl = document.querySelector( `#${groupId}` );

        const siblingCheckboxElArray = groupCheckboxEl.closest( 'li' ).querySelector( 'ul' ).querySelectorAll( 'input[type=checkbox]:checked' );
        const allUnchecked = [ ...siblingCheckboxElArray ].every( siblingCheckboxEl => !siblingCheckboxEl.checked );
        if ( allUnchecked ) {
            groupCheckboxEl.checked = false;
            const parentGroupId = groupCheckboxEl.getAttribute( 'groupId' );
            uncheckGroupIfEmpty( parentGroupId );
        }
    }
}


function createUl( parent ) {
    const ulEl = document.createElement( 'ul' );
    parent.appendChild( ulEl );
    return ulEl;
}

function createLi( parent ) {
    const liEl = document.createElement( 'li' );
    parent.appendChild( liEl );
    return liEl;
}

function createCheckboxDiv( parent, tag ) {
    const divEl = document.createElement( 'div' );
    divEl.className = 'tag-menu-item-row';

    // Checkbox
    const inputEl = document.createElement( 'input' );
    inputEl.type = 'checkbox';
    inputEl.id = `item-tag-${tag.id}`;
    inputEl.name = `item-${tag.id}`;

    if ( tag.groupId ) {
        inputEl.setAttribute( 'groupId', `item-tag-${tag.groupId}` );
    }

    if ( tag.tags ) {
        inputEl.classList.add( 'invisible' );
        inputEl.placeholder = tag.name;
    }

    // Label
    const labelEl = document.createElement( 'label' );
    labelEl.style.backgroundColor = tagColors[ tag.color ];
    labelEl.innerHTML = tag.name;
    labelEl.classList.add( 'non-select', 'non-drag' );
    if ( tag.tags ) {
        labelEl.classList.add( 'collapser', 'arrow-down' );
    }

    // Button Edit Tag
    const btnEditEl = document.createElement( 'i' );
    btnEditEl.classList.add( 'btn-icon', 'ic-edit' );

    divEl.appendChild( inputEl );
    divEl.appendChild( labelEl );
    divEl.appendChild( btnEditEl );

    // if ( !tag.tags ) {
    //     labelEl.htmlFor = inputEl.id;
    // }

    parent.appendChild( divEl );
    return [ inputEl, labelEl, btnEditEl ];
}

function updateTagMenuState( tagMenuSelector ) {
    const query = postTagIdList.map( id => `#item-tag-${id}` ).join( ',' );
    const checkboxElArray = tagMenuSelector.querySelectorAll( query );
    for ( const checkboxEl of checkboxElArray ) {
        checkboxEl.checked = true;
        checkGroupIsChecked( checkboxEl );
    }

    function checkGroupIsChecked( checkboxEl ) {
        if ( checkboxEl.hasAttribute( 'groupId' ) ) {
            const groupId = checkboxEl.getAttribute( 'groupId' );
            if ( groupId ) {
                const checkboxGroupEl = tagMenuSelector.querySelector( `#${groupId}` )
                if ( !checkboxGroupEl.checked ) {
                    checkboxGroupEl.checked = true;
                }
                checkGroupIsChecked( checkboxGroupEl );
            }
        }
    }
}
