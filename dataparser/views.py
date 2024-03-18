"""views.py"""
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import authentication, permissions
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
import pandas as pd
from rest_framework import status
import os
from .serializers import ProcessedDataSerializer, FileUploadSerializer
from .dataparser import infer_and_convert_data_types

class ProcessedDataView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser]
    serializer_class = FileUploadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            uploaded_file = serializer.validated_data['file']

            file_extension = os.path.splitext(uploaded_file.name)[1].lower()
            if file_extension == '.csv':
                df = pd.read_csv(uploaded_file)
            elif file_extension == '.xlsx':
                df = pd.read_excel(uploaded_file)
            else:
                return Response({'error': 'Unsupported file format'}, status=status.HTTP_400_BAD_REQUEST)

            df_processed = infer_and_convert_data_types(df)
            data_serializer = ProcessedDataSerializer({'data': df_processed.to_dict(orient='records')})

            return Response(data_serializer.data, status=status.HTTP_200_OK)
