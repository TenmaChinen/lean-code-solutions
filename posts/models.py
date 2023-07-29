# from parents.models import Parent
from django.db import models


class Tag(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    name = models.CharField(max_length=32, blank=False, null=False)
    color = models.PositiveSmallIntegerField(null=True, default=0)
    group = models.ForeignKey(to='self', on_delete=models.CASCADE, related_name='tags', default=None, null=True)

    def __str__(self):
        return f'({self.id}) {self.name} | Group ( {self.group.name if self.group else None} )'


class Post(models.Model):
    id = models.AutoField(primary_key=True, null=False)
    title = models.CharField(max_length=32, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    creation_date = models.DateField(auto_now_add=True, null=True)
    tag = models.ManyToManyField(to=Tag, blank=True)
