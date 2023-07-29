import dj_setup

from posts.models import Post, Tag

Post.objects.all().delete()
Tag.objects.all().delete()