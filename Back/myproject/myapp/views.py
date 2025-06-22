from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ItemSerializer, User_Login_InfoSerializer, Work_InfoSerializer
from .auth_utils import check_user_credentials, check_admin_credentials
from .models import User_Login_Info

class BaseModelHandler(APIView):
    def handle_data(self, data_type, data):
        if data_type == 'item':
            serializer = ItemSerializer(data=data)
            if serializer.is_valid():
                instance = serializer.save()
                return serializer, instance
            return None, serializer.errors
        
        elif data_type == 'work_info':
            serializer = Work_InfoSerializer(data=data)
            if serializer.is_valid():
                instance = serializer.save()
                return serializer, instance
            return None, serializer.errors

        elif data_type == 'user_login_info':
            serializer = User_Login_InfoSerializer(data=data)
            if serializer.is_valid():
                instance = serializer.save()
                return serializer, instance
            return None, serializer.errors
        
        elif data_type == 'user_info_delete':
            employee_number = data.get('employee_number')
            try:
                user = User_Login_Info.objects.get(employee_number=employee_number)
                user.delete()
                return {'success': True, 'message': '삭제 성공'}, None
            except User_Login_Info.DoesNotExist:
                return None, {'error': '해당 사용자가 존재하지 않습니다.'}
            
        elif data_type == 'user_info_update':
            employee_number = data.get('employee_number')
            try:
                instance = User_Login_Info.objects.get(employee_number=employee_number)
                serializer = User_Login_InfoSerializer(instance, data=data, partial=True)
                if serializer.is_valid():
                    updated_instance = serializer.save()
                    return serializer, updated_instance
                return None, serializer.errors
            except User_Login_Info.DoesNotExist:
                return None, {"error": f"User_Login_Info with id={employee_number} does not exist"}
    
        elif data_type == 'check_user_login':  # 'check_user_login으로 변경해야함'
             user_id  = data.get('id')
             password = data.get('password')
     
             success, user_name, employee_number = check_user_credentials(user_id, password)
     
             if success:
                 return {'success': True, 'message': 'Login successful', 'user_name': user_name, 'employee_number' : employee_number}, None
             else:
                 return None, {'success': False, 'message': 'Invalid credentials'}
             
        elif data_type == 'check_admin_login':
                 admin_id   = data.get('id')
                 password   = data.get('password')
                 admin_code = data.get('admin_code')
         
                 success, user_data = check_admin_credentials(admin_id, password, admin_code)
         
                 if success:
                     return {'success': True, 'message': 'Login successful', 'user_data': user_data}, None
                 else:
                     return None, {'success': False, 'message': 'Invalid credentials'}
                 
        elif data_type == 'filtering':
            filetering = data.get('filetering', {})  # 조건을 가져옵니다.
            sorting    = data.get('sorting')  # 정렬 기준을 가져옵니다.
        
            try:
                filters = {}
                for key, value in filetering.items():
                    if isinstance(value, str):  # 문자열이면 LIKE 조건 처리
                        filters[f'{key}__icontains'] = value
                    elif isinstance(value, (int, float)):  # 숫자일 경우 LIKE 조건 처리
                        filters[f'{key}__icontains'] = str(value)
                    else:
                        filters[key] = value  # 다른 타입은 그냥 필터링
        
                # 조건이 없으면 filter는 모든 데이터를 반환함
                queryset = User_Login_Info.objects.filter(**filters)
        
                # 정렬 기준이 있을 경우에만 order_by 적용
                if sorting:
                    queryset = queryset.order_by(*sorting)
        
                result = list(queryset.values())
                return {'success': True, 'data': result}, None
        
            except Exception as e:
                return None, {'error': str(e)}

        return None, {'error': 'Unknown data_type'}
    

        

class ItemUserProfileHandler(BaseModelHandler):
    def post(self, request):
        print("받은 데이터:", request.data)

        data_type = request.data.get('data_type')
        data_content = request.data.get('data')

        serializer, instance = self.handle_data(data_type, data_content)

        if serializer:
            # serializer일 수도 있고 dict일 수도 있음
            response_data = (
                serializer.data if hasattr(serializer, 'data') else serializer
            )
            return Response({
                'message': f'{data_type} 처리 완료!',
                'data': response_data
            }, status=status.HTTP_200_OK)

        return Response(instance, status=status.HTTP_400_BAD_REQUEST)