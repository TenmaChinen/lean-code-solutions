from django.urls import path, include
from posts import views

app_name = 'posts'

urlpatterns = [
    path('list/',views.post_list_view, name='list'),
    path('editor/',views.post_editor_view, name='editor'),
    path('editor/<int:pk>/',views.post_editor_view, name='editor'),
    # path('detail/<int:pk>',views.PostDetailView.as_view(), name='detail'),
    # path('update/<int:pk>',views.PostUpdateView.as_view(), name='update'),
    # path('delete/<int:pk>',views.PostDeleteView.as_view(), name='delete'),
]