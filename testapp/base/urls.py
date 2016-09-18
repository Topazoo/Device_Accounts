from django.conf.urls import url
from . import views




urlpatterns = [
    url(r'^$', views.base, name='base'),
    url(r'update_name', views.update_name, name='update_name'),
    url(r'pair_device', views.pair_device, name='pair_device'),
    url(r'remove_obj', views.remove_obj, name='remove_obj'),
    url(r'get_device_message', views.get_device_message, name='get_device_message'),
]
