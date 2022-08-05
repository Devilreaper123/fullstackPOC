from rest_framework import serializers
from .models import PatientNewData


class PatientNewDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientNewData
        fields = "__all__"


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()


class SaveFileSerializer(serializers.Serializer):
    class Meta:
        model = PatientNewData
        fields = "__all__"
