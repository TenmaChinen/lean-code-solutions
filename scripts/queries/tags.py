import dj_setup

from posts.models import Tag


query = Tag.objects.filter( group__isnull=True )
for tag in query:
    print(tag.name)
    for sub_tag in tag.tags.all():
        print('\t',sub_tag)

