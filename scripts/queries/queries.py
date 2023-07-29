import dj_setup

from django.forms import model_to_dict
from posts.models import Post, Tag
from posts.forms import FormPost
# from pandas import DataFrame
import json

# queryset = Tag.objects.all()
# queryset = queryset.values()
# df = DataFrame(data=queryset)
# print(df)

post = Post.objects.first()

l_id = post.tag.values_list('id', flat=True)
x = json.dumps(list(l_id))
print(x)

# for post in Post.objects.all():
#     print(post.id)
#     d_post = model_to_dict(post, exclude='tag')
#     d_post[ 'tags' ] = [ model_to_dict(instance=tag) for tag in post.tag.all() ]
#     print(d_post)
#     break

    # print(post.tag.all())
# print(post.tag.all())
# for x in post.tag.all():
#     print(x)

# queryset = Tag.objects.filter(name__in=['Android','Python','Java'])
# print(queryset)

# queryset = Tag.objects.filter(group__isnull=True)
# for x in queryset:
#     print(x)

# tag = Tag.objects.get(name='Framework')
# for sub_tag in tag.tags.all():
#     print(sub_tag)

# tag = Tag.objects.get(name='React')
# print(tag)
# print(tag.group)


# form_post = FormPost()
# print(dir(form_post.fields['tag']))
# print(form_post.as_p())

# queryset = Post.objects.all()

# print(queryset)