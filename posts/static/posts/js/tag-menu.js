const btnOpenTagMenuPanel = document.getElementById( 'btn-open-tag-panel' );
const tagMenuPanelEl = document.getElementById( 'tag-menu-panel' );
const tagMenuTitleEl = document.getElementById( 'tag-menu-title' );
const btnTagMenuBack = document.getElementById( 'btn-tag-menu-back' );
const btnTagMenuClose = document.getElementById( 'btn-tag-menu-close' );
const tagMenuContainer = document.getElementById( 'tag-menu-container' );
// const mainUlEl = createItems( tagMenuContainer, tagList );

const tagColors = getTagColors();

// setTagMenuSelector();
createTagEditor( tagList[ 0 ] );
updateTagMenuState();


function setTagMenuSelector() {
    tagMenuTitleEl.innerHTML = 'Tag Selector';
    createItems( tagMenuContainer, tagList );
}

function createItems( parent, tags ) {
    const ulEl = createUl( parent );
    for ( const tag of tags ) {
        const li = createLi( ulEl );
        const [ checkboxEl, labelEl ] = createCheckboxDiv( li, tag );
        const subItems = tag.tags;
        const hasSubItems = subItems != null;
        let subCheckboxElArray = null;

        if ( hasSubItems ) {
            const subUlEl = createItems( li, subItems );
            subCheckboxElArray = subUlEl.querySelectorAll( 'input[type=checkbox]' );

            labelEl.addEventListener( 'click', e => {
                // console.log(subUlEl);
                subUlEl.classList.toggle( 'unfolded' );
                labelEl.classList.toggle( 'arrow-down' );
            } );
        }

        checkboxEl.addEventListener( 'change', e => {
            if ( hasSubItems ) {
                // Check-Uncheck Children from Parent
                subCheckboxElArray.forEach( subCheckboxEl => {
                    subCheckboxEl.checked = checkboxEl.checked;
                } );
            }

            // Check Parent when Child is Checked
            const groupId = checkboxEl.getAttribute( 'group' );
            if ( checkboxEl.checked ) {
                // console.log( groupId, checkboxEl );
                checkGroupIfAny( groupId );
            } else {
                uncheckGroupIfEmpty( groupId );
            }
        } );
    }

    return ulEl;
}

// Recursive Functions To Cover all the tree of Check Uncheck of Groups

function checkGroupIfAny( groupId ) {
    if ( groupId ) {
        const groupCheckboxEl = document.querySelector( `#${groupId}` );
        groupCheckboxEl.checked = true;
        const parentGroupId = groupCheckboxEl.getAttribute( 'group' );
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
            const parentGroupId = groupCheckboxEl.getAttribute( 'group' );
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
        inputEl.setAttribute( 'group', `item-tag-${tag.groupId}` );
    }

    if ( tag.tags ) {
        inputEl.classList.add( 'invisible' );
        inputEl.placeholder = tag.name;
    }

    // Label
    const labelEl = document.createElement( 'label' );

    labelEl.style.backgroundColor = tagColors[ tag.color ];
    labelEl.innerHTML = tag.name;
    if ( tag.tags ) {
        labelEl.classList.add( 'collapser' );
        labelEl.classList.add( 'arrow-down' );
    }

    // Button Edit Tag
    const btnEditEl = document.createElement( 'i' );
    btnEditEl.classList.add( 'btn-icon' );
    btnEditEl.classList.add( 'ic-edit' );
    btnEditEl.addEventListener( 'click', e => createTagEditor( tag ) );


    divEl.appendChild( inputEl );
    divEl.appendChild( labelEl );
    divEl.appendChild( btnEditEl );

    if ( !tag.tags ) {
        labelEl.htmlFor = inputEl.id;
    }

    parent.appendChild( divEl );
    return [ inputEl, labelEl ];
}


btnOpenTagMenuPanel.addEventListener( 'click', e => {
    tagMenuPanelEl.classList.toggle( 'tag-menu-visible' );
} );

btnOpenTagMenuPanel.click();

function updateTagMenuState() {
    const query = postTagIdList.map( id => `#item-tag-${id}` ).join( ',' );
    const checkboxElArray = tagMenuContainer.querySelectorAll( query );
    for ( const checkboxEl of checkboxElArray ) {
        checkboxEl.checked = true;
    }
}

function getTagColors() {
    const rootStyle = getComputedStyle( document.querySelector( ':root' ) );
    const tagColors = {};

    for ( let idx = 0; idx < 30; idx++ ) {
        const colorHex = rootStyle.getPropertyValue( `--tag-color-${idx}` );
        tagColors[ idx ] = colorHex;

    }
    return tagColors;
}

/* Tag Editor */

btnTagMenuBack.addEventListener( 'click', e => {
    tagMenuContainer.innerHTML = null;
    btnTagMenuBack.classList.toggle( 'visible' );
    setTagMenuSelector();
} )

function createTagEditor( tag ) {
    btnTagMenuBack.classList.toggle( 'visible' );

    tagMenuContainer.innerHTML = null;
    tagMenuTitleEl.innerHTML = 'Tag Editor';

    const labelTitleEl = document.createElement( 'label' );
    labelTitleEl.htmlFor = 'tag-name';
    labelTitleEl.innerHTML = 'Tag Name';

    const inputTagNameEl = document.createElement( 'input' );
    inputTagNameEl.id = 'tag-editor-name';
    inputTagNameEl.name = 'name';
    inputTagNameEl.type = 'text';
    inputTagNameEl.value = tag.name;

    const labelColorEl = document.createElement( 'label' );
    labelColorEl.innerHTML = 'Select a color';

    const containerColorsEl = document.createElement( 'div' );
    containerColorsEl.className = 'tag-editor-colors-container';

    for ( let i = 0; i < 2; i++ ) {
        for ( let j = 0; j < 3; j++ ) {
            for ( let k = (15*i)+j; k < 15*(i+1); k += 3 ) {
                const btnColorEl = document.createElement( 'div' );
                btnColorEl.classList.add( 'btn-select-color' );
                btnColorEl.style.backgroundColor = tagColors[ k ];
                containerColorsEl.appendChild( btnColorEl );
            }
        }
    }

    tagMenuContainer.appendChild( labelColorEl );
    tagMenuContainer.appendChild( inputTagNameEl );
    tagMenuContainer.appendChild( labelColorEl );
    tagMenuContainer.appendChild( containerColorsEl );
}