"""urls.py"""

from django.urls import path
from .views import ProcessedDataView

urlpatterns = [
    path('', ProcessedDataView.as_view(), name='process_file'),
]
