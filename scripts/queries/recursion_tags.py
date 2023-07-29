import dj_setup

from django.forms.models import model_to_dict
from posts.models import Tag
import random, json

random.seed(1)

def iterate_queryset(queryset, level):
    indent = '\t' * level
    l_tags = []
    for tag in queryset:
        d_tag = model_to_dict(instance=tag)
        color = random.sample(population=range(20,201), k=3)
        d_tag['color'] = '#' + ''.join([ f'{c:X}' for c in color ])
        # print(indent,d_tag)
        sub_queryset = tag.tags.all()
        l_sub_tags = None
        if sub_queryset.exists():
            l_sub_tags = iterate_queryset(sub_queryset, level+1)
        d_tag['tags'] = l_sub_tags
        l_tags.append(d_tag)
    return l_tags

queryset = Tag.objects.filter( group__isnull=True )

l_tags = iterate_queryset(queryset=queryset, level=0)

print(json.dumps(l_tags, indent=2))