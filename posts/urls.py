from django.urls import path, include
from posts import views

app_name = 'posts'

urlpatterns = [
    path('list/',views.post_list_view, name='list'),
    path('editor/',views.post_editor_view, name='editor'),
    path('editor/<int:pk>/',views.post_editor_view, name='editor'),
    path('tags/create/',views.create_tag),
    path('tags/update/<int:pk>/',views.update_tag),
    path('tags/delete/<int:pk>/',views.delete_tag),
    path('editor/update-tags/<int:pk>/',views.update_post_tags),
    # path('detail/<int:pk>',views.PostDetailView.as_view(), name='detail'),
    # path('update/<int:pk>',views.PostUpdateView.as_view(), name='update'),
    # path('delete/<int:pk>',views.PostDeleteView.as_view(), name='delete'),
]