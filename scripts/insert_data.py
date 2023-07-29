import dj_setup

from posts.models import Post, Tag
import json

file = open('data.json', 'r', encoding='utf-8')
d_data = json.load(file)
file.close()

# TAGS

for d_tag in d_data['tags']:
    if d_tag['group']:
        d_tag['group'] = Tag.objects.get(id=d_tag['group'])
    tag = Tag( **d_tag )
    tag.save()


# POSTS

for d_exercise in d_data['posts']:
    
    l_tags = d_exercise.pop('tag')
    l_tags = Tag.objects.filter( name__in = l_tags )

    post = Post( **d_exercise )
    post.save()
    post.tag.set(l_tags)
