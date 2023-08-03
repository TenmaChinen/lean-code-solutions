import { tagColors } from '../tag-colors.js';

export default function createTagMenuEditor( tag, handleFormSubmit ) {
    
    const tagMenuEditorContainer = document.createElement( 'div' );
    tagMenuEditorContainer.id = 'tag-menu-editor-container';

    // Label Tag Name
    const labelTagNameEl = document.createElement( 'label' );
    labelTagNameEl.innerHTML = 'Tag Name';
    
    // Input Tag Name
    const inputTagNameEl = document.createElement( 'input' );
    inputTagNameEl.id = 'tag-editor-name';
    inputTagNameEl.name = 'name';
    inputTagNameEl.type = 'text';
    inputTagNameEl.value = tag.name;
    inputTagNameEl.style.backgroundColor = tagColors[ tag.color ];
    
    // Label Tag Abbreviation
    const labelTagAbbreviationEl = document.createElement( 'label' );
    labelTagAbbreviationEl.innerHTML = 'Tag Abbreviation';
    
    // Input Tag Abbreviation
    const inputTagAbbreviationEl = document.createElement( 'input' );
    inputTagAbbreviationEl.id = 'tag-editor-abbreviation';
    inputTagAbbreviationEl.name = 'abbreviation';
    inputTagAbbreviationEl.type = 'text';
    inputTagAbbreviationEl.value = tag.abbreviation;
    inputTagAbbreviationEl.style.backgroundColor = tagColors[ tag.color ];
    
    labelTagNameEl.htmlFor = inputTagNameEl.id;
    labelTagAbbreviationEl.htmlFor = inputTagAbbreviationEl.id;

    // Label Select Color
    const labelColorEl = document.createElement( 'label' );
    labelColorEl.innerHTML = 'Select a color';

    // Container Select Color
    const containerColorsEl = document.createElement( 'div' );
    containerColorsEl.className = 'tag-editor-colors-container';
    containerColorsEl.addEventListener( 'change', event => {
        const colorId = event.target.value;
        inputTagNameEl.style.backgroundColor = tagColors[ colorId ];
    } );

    for ( let i = 0; i < 2; i++ ) {
        for ( let j = 0; j < 3; j++ ) {
            for ( let k = ( 15 * i ) + j; k < 15 * ( i + 1 ); k += 3 ) {
                createButtonTagColor( containerColorsEl, k );
            }
        }
    }

    const btnInputEl = containerColorsEl.querySelector( `#btn-tag-color-${tag.color}` );
    btnInputEl.checked = true;

    // Form

    const form = document.createElement( 'form' );
    form.id = 'tag-menu-editor-form';
    form.method = 'POST';
    form.onsubmit = handleFormSubmit;

    form.appendChild( labelTagNameEl );
    form.appendChild( inputTagNameEl );
    form.appendChild( labelTagAbbreviationEl );
    form.appendChild( inputTagAbbreviationEl );
    form.appendChild( labelColorEl );
    form.appendChild( containerColorsEl );
    // form.appendChild( btnSave );

    tagMenuEditorContainer.appendChild( form );
    return tagMenuEditorContainer;
}

function createButtonTagColor( parent, colorId ) {
    const divEl = document.createElement( 'div' );
    divEl.classList.add( 'btn-select-color' );

    const inputEl = document.createElement( 'input' );
    inputEl.type = 'radio';
    inputEl.name = 'color';
    inputEl.value = colorId;
    inputEl.id = `btn-tag-color-${colorId}`;

    const labelEl = document.createElement( 'label' );
    labelEl.htmlFor = inputEl.id;
    labelEl.style.backgroundColor = tagColors[ colorId ];

    divEl.appendChild( inputEl );
    divEl.appendChild( labelEl );

    parent.appendChild( divEl );
}