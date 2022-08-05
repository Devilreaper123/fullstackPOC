from django.urls import re_path,path
from . import views
from .views import UploadFileView
urlpatterns = [
    re_path(r'^patientnewdata$',views.patientDataApi),
    re_path(r'^patientnewdata/([0-9]+)$',views.patientDataApi),
    path('upload/', UploadFileView.as_view(), name='upload-file')
]

