from posts.models import Post
from django import forms

class FormPost(forms.ModelForm):
  
  class Meta:
    model = Post
    exclude = ('id', 'creation_date', 'tag' )