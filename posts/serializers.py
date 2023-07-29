from django.forms import model_to_dict
import json

def tags_to_json(queryset):
    l_tags = __tag_queryset_to_json(queryset)
    json_tags = json.dumps(l_tags)
    return json_tags

def __tag_queryset_to_json(queryset):
    l_tags = []
    for tag in queryset:
        d_tag = model_to_dict(instance=tag)
        d_tag['groupId'] = d_tag.pop('group')
        sub_queryset = tag.tags.all()
        l_sub_tags = None
        if sub_queryset.exists():
            l_sub_tags = __tag_queryset_to_json(sub_queryset)
        d_tag['tags'] = l_sub_tags
        l_tags.append(d_tag)
    return l_tags


def posts_to_json(queryset):
    l_posts = []
    for post in queryset:
        d_post = model_to_dict(instance=post, exclude='content,tag')
        d_post['tags'] = [ model_to_dict(tag, exclude='group') for tag in post.tag.all() ]
        l_posts.append(d_post)
    json_posts = json.dumps(l_posts)
    return json_posts

def post_tags_id_to_json(post):
    l_post_tags_id = list(post.tag.values_list('id', flat=True))
    json_post_tags_id = json.dumps(l_post_tags_id)
    return json_post_tags_id
