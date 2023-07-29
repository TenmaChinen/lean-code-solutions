# from django.urls import reverse_lazy
from django.shortcuts import render
from posts.models import Post, Tag
from posts.forms import FormPost
from posts import serializers
import pdb

def post_editor_view(request,pk=None):
    
    queryset = Tag.objects.filter( group__isnull=True )
    json_all_tags = serializers.tags_to_json(queryset)

    if request.method == 'POST':
        pass
    #     pdb.set_trace()

    else:
        if pk is None:
            form = FormPost()
            json_post_tags = '[]'
        else:
            post = Post.objects.get(pk=pk)
            form = FormPost(instance=post)
            json_post_tags_id = serializers.post_tags_id_to_json(post)

    context = dict(
        form=form,
        json_post_tags_id = json_post_tags_id,
        json_all_tags = json_all_tags,
    )
    return render(request, 'posts/post-editor.html', context)


def post_list_view(request):

    queryset = Post.objects.all()
    json_posts = serializers.posts_to_json(queryset=queryset)

    context = dict(
        json_posts = json_posts
    )
    return render(request, 'posts/post-list.html', context)