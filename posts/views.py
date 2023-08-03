# from django.urls import reverse_lazy
from django.http import JsonResponse
from django.shortcuts import render
from posts.models import Post, Tag
from posts.forms import FormPost
from posts import serializers
import pdb

#########################
######   P O S T   ######
#########################

def post_editor_view(request,pk=None):

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
        post_id=pk,
        form=form,
        json_post_tags_id = json_post_tags_id,
        json_all_tags = Tag.get_json_all_tags(),
    )
    return render(request, 'posts/post-editor.html', context)


def post_list_view(request):

    queryset = Post.objects.all()
    json_posts = serializers.posts_to_json(queryset=queryset)

    context = dict(
        json_posts = json_posts,
        json_all_tags = Tag.get_json_all_tags()
    )
    return render(request, 'posts/post-list.html', context)


def update_post_tags(request,pk):
    post = Post.objects.get(id=pk)
    d_data = request.POST
    l_tag_id = list(map( int, d_data.getlist('listTagId') ))
    l_tags = Tag.objects.filter(id__in = l_tag_id)
    # pdb.set_trace()
    post.tag.set(l_tags)
    post.save()
    
    return JsonResponse({'success' : True})

#########################
#######   T A G   #######
#########################


def create_tag(request):
    d_data = request.POST
    # pdb.set_trace()

    tag = Tag()
    tag.group = d_data.get('group')
    tag.name = d_data['name']
    tag.color = d_data['color']
    tag.save()
    return JsonResponse({'success' : True, 'id' : tag.id })


def update_tag(request, pk):
    d_data = request.POST
    tag = Tag.objects.get(id=pk)
    tag.name = d_data['name']
    tag.abbreviation = d_data['abbreviation']
    tag.color = d_data['color']
    tag.save()

    return JsonResponse({'success' : True })

def delete_tag(request, pk):
    # tag_id = request.POST['id']
    tag = Tag.objects.get(id=pk)
    tag.delete()
    return JsonResponse({'success' : True })

