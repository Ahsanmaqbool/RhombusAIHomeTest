"""serializers.py"""

from rest_framework import serializers

class ProcessedDataSerializer(serializers.Serializer):
    data = serializers.ListField(child=serializers.DictField())

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField(use_url=False)