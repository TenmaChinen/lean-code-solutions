from django.views.generic import RedirectView
from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', RedirectView.as_view(url='posts/list/')),
    path('posts/', include('posts.urls')),
    path('__reload__/', include('django_browser_reload.urls')),
]
