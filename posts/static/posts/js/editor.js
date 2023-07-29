const root = document.querySelector(':root');

const textareaEl = document.getElementById( 'id_content' );
const containerMarkdownEl = document.getElementById( 'container-markdown' );
const sectionEditor = document.querySelector('.section-editor');
const sectionMarkdown = document.querySelector('.section-markdown');

function getPixelValue( property ){
    const pixels = getComputedStyle(root).getPropertyValue(property);
    return parseInt(pixels.match('[0-9]+')[0]);
}

sectionEditor.addEventListener( 'mousewheel', e => {
    if ( e.ctrlKey ) {
        e.preventDefault();
        let fontSizeTitle = getPixelValue('--font-size-title');
        let fontSizeContent = getPixelValue('--font-size-content');
        const minFontSize = Math.min(fontSizeTitle, fontSizeContent);
        const maxFontSize = Math.max(fontSizeTitle, fontSizeContent);
        
        if ( e.deltaY < 0  && maxFontSize < 20 ) { // Zoom Up
            fontSizeTitle += 1;
            fontSizeContent += 1;
        } else if ( e.deltaY > 0 && minFontSize > 8 ) { // Zoom Out
            fontSizeTitle -= 1;
            fontSizeContent -= 1;
        }
        root.style.setProperty('--font-size-title', fontSizeTitle + 'px' );
        root.style.setProperty('--font-size-content', fontSizeContent + 'px' );
    }
}, { passive: false } );

sectionMarkdown.addEventListener( 'mousewheel', e => {
    if ( e.ctrlKey ) {
        e.preventDefault();
        let fontSizeMarkdown = getPixelValue('--font-size-markdown');
        
        if ( e.deltaY < 0  && fontSizeMarkdown < 20 ) { // Zoom Up
            fontSizeMarkdown += 1;
        } else if ( e.deltaY > 0 && fontSizeMarkdown > 8 ) { // Zoom Out
            fontSizeMarkdown -= 1;
        }
        root.style.setProperty('--font-size-markdown', fontSizeMarkdown + 'px' );
    }
}, { passive: false } );

textareaEl.addEventListener( 'keydown', e => {

    // console.log(e.code);
    console.log(e.ctrlKey, e.shiftKey, e.code);
    if ( e.ctrlKey && e.code === 'Enter' ) {
        renderMarkdown();
    }
    
    /* else if( e.code == 'Tab' ){
        e.preventDefault();
        const selectionStart = textareaEl.selectionStart;
        const selectionEnd = textareaEl.selectionEnd;
        const textEnd = textareaEl.value.length;
        const prevText = textareaEl.value.substring(0,selectionStart);
        const insertText = '    ';
        const postText = textareaEl.value.substring(selectionEnd,textEnd);
        textareaEl.value = prevText + insertText + postText;
        textareaEl.selectionEnd = selectionStart + 4;
    } */
} );


function renderMarkdown() {
    const text = textareaEl.value;
    containerMarkdownEl.innerHTML = marked.parse( text );
    hljs.highlightAll();
}

renderMarkdown();

// contentEl.innerHTML = marked.parse( markdownText );
