import dj_setup

from posts.models import Tag
import json

queryset = Tag.objects.all()

for tag in queryset:
    tag.color = 0
    tag.save()