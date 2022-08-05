from .models import PatientNewData
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import PatientNewData
from .serializers import PatientNewDataSerializer, FileUploadSerializer, SaveFileSerializer
from django.shortcuts import render
from rest_framework import generics
import pandas as pd
from rest_framework.response import Response


@csrf_exempt
def patientDataApi(req, id=0):
    if req.method == 'GET':
        patients = PatientNewData.objects.all()
        patients_serializer = PatientNewDataSerializer(patients, many=True)
        return JsonResponse(patients_serializer.data, safe=False)
    elif req.method == 'POST':
        patient_data = JSONParser().parse(req)
        patients_serializer = PatientNewDataSerializer(data=patient_data)
        if patients_serializer.is_valid():
            patients_serializer.save()
            return JsonResponse("ADDED SUCCESSFULLY", safe=False)
        return JsonResponse("FAILED TO ADD", safe=False)
    elif req.method == 'PUT':
        patient_data = JSONParser().parse(req)
        patients = PatientNewData.objects.get(
            PatientId=patient_data['PatientId'])
        department_serializer = PatientNewDataSerializer(
            patients, data=patient_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("UPDATED SUCCESSFULLY", safe=False)
        return JsonResponse("FAILED TO UPDATE", safe=False)
    elif req.method == 'DELETE':
        department = PatientNewData.objects.get(PatientId=id)
        department.delete()
        return JsonResponse("DELETED SUCCESSFULLY", safe=False)


class UploadFileView(generics.CreateAPIView):
    serializer_class = FileUploadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        reader = pd.read_csv(file)
        for _, row in reader.iterrows():
            gender = row[3].upper()
            user = row[6]
            new_file = PatientNewData.objects.create(
                PatientName=row[1],
                MRN=int(row[2]),
                Gender=gender,
                DOB=row[4],
                HospitalName=row[5],
                LastUpdatedBy=user,
                NoteId=row[7],
                Prescription=row[8],
            )
            new_file.save()
        return Response({"status": "success"})


def front(request):
    context = {}
    return render(request, "index.html", context)
