import {tagColors} from './tag-colors.js';

const postsContainerEl = document.getElementById( 'post-list-container' );

for ( const post of postArray ) {
    // console.log( post );
    createPost(postsContainerEl, post);
}


function createPost( parent, post ) {
    const wrapperEl = document.createElement( 'a' );
    wrapperEl.href = `/posts/editor/${post.id}`;
    wrapperEl.className = 'post-wrapper';

    const headerEl = document.createElement( 'h5' );
    headerEl.className = 'post-title';
    headerEl.innerHTML = post.title;

    const tagsUlEl = document.createElement( 'ul' );
    tagsUlEl.className = 'post-tags-ul';

    for ( const tag of post.tags ) {
        const tagLiEl = createTag(tagsUlEl, tag );
    }

    wrapperEl.appendChild( headerEl );
    wrapperEl.appendChild( tagsUlEl );
    parent.appendChild(wrapperEl);
}


function createTag( parent, tag ){
    const liEl = document.createElement('li');
    liEl.id = tag.id;
    liEl.innerHTML = tag.abbreviation;
    console.log(tag.color);
    liEl.style.backgroundColor = tagColors[tag.color];
    parent.appendChild( liEl );
    return liEl;
}