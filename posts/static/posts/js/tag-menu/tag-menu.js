import createTagMenuSelector from './tag-menu-selector.js';
import createTagMenuEditor from './tag-menu-editor.js';

const btnOpenTagMenuPanel = document.getElementById( 'btn-open-tag-panel' );
const tagMenuPanelEl = document.getElementById( 'tag-menu-panel' );
const tagMenuTitleEl = document.getElementById( 'tag-menu-title' );
const btnTagMenuBack = document.getElementById( 'btn-tag-menu-back' );
const btnTagMenuClose = document.getElementById( 'btn-tag-menu-close' );
const tagMenuBody = document.getElementById( 'tag-menu-body' );
const tagMenuFooter = document.querySelector( '#tag-menu-panel > footer' );

displayTagSelector();
// displayTagEditor(tagList[0]);

// T A G   S E L E C T O R

function displayTagSelector() {

    function handleClickBtnEdit( tag ) {
        displayTagEditor( tag );
    }

    function handleClickBtnCreate() {
        const selectedCheckboxEl = tagMenuSelector.querySelector( 'input[type=checkbox]:has(+label.selected)' );
        const tag = { id: null, name: '', color: 0 };
        if ( selectedCheckboxEl ) {
            tag.group = getTagId( selectedCheckboxEl.id );
        }
        displayTagEditor( tag );
    }

    function handleClickBtnDelete() {
        const selectedCheckboxEl = tagMenuSelector.querySelector( 'input[type=checkbox]:has(+label.selected)' );
        if ( selectedCheckboxEl ) {
            const tagId = getTagId( selectedCheckboxEl.id );
            const request = getBaseRequest( null );

            fetch( `/posts/tags/delete/${tagId}/`, request )
                .then( response => response.json() )
                .then( data => {
                    tagList = deleteTagById( tagList, tagId );
                    displayTagSelector();
                } );
        }
    }

    function deleteTagById( list, id ) {
        return list.filter( tag => {
            const condition = ( tag.id != id );
            if ( condition && tag.tags ) {
                tag.tags = deleteTagById( tag.tags, id );
            }
            return condition;
        } );
    }

    function handleCheckedTagsChanged() {

        if ( postId ) {
            const nodeList = tagMenuSelector.querySelectorAll( 'input[type=checkbox]:checked' );
            const tagIdList = [ ...nodeList ].map( el => getTagId( el.id ) );

            const formData = new URLSearchParams();
            for( const tagId of tagIdList ){
                formData.append( 'listTagId', tagId );
            }

            const request = getBaseRequest( formData );
            fetch( `/posts/editor/update-tags/${postId}/`, request )
                .then( response => response.json )
                .then( data => {
                    console.log( data );
                } );
        }
    }

    // Header
    tagMenuTitleEl.innerHTML = 'Tag Selector';

    // Body
    const selectorHandlers = { handleClickBtnEdit, handleCheckedTagsChanged };
    const tagMenuSelector = createTagMenuSelector( tagList, selectorHandlers );
    tagMenuBody.innerHTML = null;
    tagMenuBody.appendChild( tagMenuSelector );

    // Footer

    // Button Create
    const btnCreateTag = document.createElement( 'button' );
    btnCreateTag.className = 'btn-create-tag';
    btnCreateTag.innerHTML = 'Create';
    btnCreateTag.addEventListener( 'click', e => handleClickBtnCreate() );

    // Button Create
    const btnDeleteTag = document.createElement( 'button' );
    btnDeleteTag.className = 'btn-delete-tag';
    btnDeleteTag.innerHTML = 'Delete';
    btnDeleteTag.addEventListener( 'click', e => handleClickBtnDelete() );

    tagMenuFooter.innerHTML = null;
    tagMenuFooter.appendChild( btnCreateTag );
    tagMenuFooter.appendChild( btnDeleteTag );
}

// T A G   E D I T O R

function displayTagEditor( tag ) {

    function handleFormSubmit( event ) {
        event.preventDefault();

        const formData = new URLSearchParams( new FormData( event.target ) );
        const request = getBaseRequest( formData );

        if ( tag.id == null ) {
            fetch( '/posts/tags/create/', request )
                .then( response => response.json() )
                .then( data => {
                    console.log( 'Create Response :', data );
                    tag.id = data.id;
                    tag.name = formData.get( 'name' );
                    tag.abbreviation = formData.get( 'abbreviation' );
                    tag.color = formData.get( 'color' );
                    tagList.push( tag );
                    displayTagSelector();
                } );
            } else {
                fetch( `/posts/tags/update/${tag.id}/`, request )
                .then( response => response.json() )
                .then( data => {
                    tag.name = formData.get( 'name' );
                    tag.abbreviation = formData.get( 'abbreviation' );
                    tag.color = formData.get( 'color' );
                    displayTagSelector();
                } );
        }
    }

    // Header
    tagMenuTitleEl.innerHTML = 'Tag Editor';
    tagMenuBody.innerHTML = null;

    // Body
    btnTagMenuBack.classList.toggle( 'visible' );
    const tagMenuEditor = createTagMenuEditor( tag, handleFormSubmit );
    tagMenuBody.appendChild( tagMenuEditor );

    // Footer
    const btnSave = document.createElement( 'input' );
    btnSave.type = 'submit';
    btnSave.value = 'Save';
    btnSave.className = 'btn-save-tag';
    btnSave.setAttribute( 'form', tagMenuEditor.querySelector( 'form' ).id );

    tagMenuFooter.innerHTML = null;
    tagMenuFooter.appendChild( btnSave );
}

btnOpenTagMenuPanel.addEventListener( 'click', e => {
    tagMenuPanelEl.classList.toggle( 'tag-menu-visible' );
} );

btnOpenTagMenuPanel.click();

btnTagMenuBack.addEventListener( 'click', e => {
    btnTagMenuBack.classList.toggle( 'visible' );
    displayTagSelector();
} )

btnTagMenuClose.addEventListener( 'click', e => {
    tagMenuPanelEl.classList.toggle( 'tag-menu-visible' );
} );




function getBaseRequest( formData ) {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-CSRFToken': csrfToken },
        mode: 'same-origin',
        body: formData
    };
}

function getTagId( elementId ) {
    return elementId.match( '[0-9]+' )[ 0 ];
}