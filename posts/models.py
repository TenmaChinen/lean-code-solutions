# from parents.models import Parent
from django.db import models
from posts import serializers


class Tag(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=32, blank=True, null=True)
    abbreviation = models.CharField(max_length=6, blank=True, null=True, default='')
    color = models.PositiveSmallIntegerField(null=True, default=0)
    group = models.ForeignKey(to='self', on_delete=models.CASCADE, related_name='tags', default=None, null=True)

    def __str__(self):
        return f'({self.id}) {self.abbreviation} | Group ( {self.group.abbreviation if self.group else None} )'


    @classmethod
    def get_json_all_tags(cls):
        queryset = Tag.objects.filter( group__isnull=True )
        return serializers.tags_to_json(queryset)


class Post(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    title = models.CharField(max_length=32, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    creation_date = models.DateField(auto_now_add=True, null=True)
    tag = models.ManyToManyField(to=Tag, blank=True)
