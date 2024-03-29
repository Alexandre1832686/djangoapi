from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from demo_api_app.models import Category, Product, FavoriteProduct,Rating
from demo_api_app.serializers import \
  CategorySerializer, \
  ProductSerializer, \
  RatingSerializer


class CategoryViewSet(ModelViewSet):
  permission_classes = [IsAuthenticatedOrReadOnly]
  queryset = Category.objects.all().order_by('name')
  serializer_class = CategorySerializer
  http_method_names = ['get']

class RatingViewSet(ModelViewSet):
  permission_classes = [IsAuthenticatedOrReadOnly]
  queryset = Rating.objects.all().order_by('id')
  serializer_class = RatingSerializer
  http_method_names = ['get','post','put']


class ProductViewSet(ModelViewSet):
  permission_classes = [IsAuthenticated]
  queryset = Product.objects.all().order_by('name')
  serializer_class = ProductSerializer
  http_method_names = ['get', 'put']


class GetAllCategories(APIView):
  permission_classes = [IsAuthenticatedOrReadOnly]
  http_method_names = ['get']

  def get(self, request):
    categories = Category.objects.all().order_by('name')
    return Response(categories.values(), status=status.HTTP_200_OK)
  
class GetAllRatingbyproduct(APIView):
  permission_classes = [IsAuthenticatedOrReadOnly]
  http_method_names = ['get']

  def get(self, request, productid):
    
    ratings = Rating.objects.filter(product=productid)
    ratings_serializer = RatingSerializer(ratings, many=True)
    return Response(ratings_serializer.data, status=status.HTTP_200_OK)
  
class CreateRating(APIView):
  permission_classes = [IsAuthenticatedOrReadOnly]
  http_method_names = ['post']

  def post(self, request):
    rating = request.data
    rating["user"] = request.user.id
    serializer = RatingSerializer(data=rating, context={'request': request}, )
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  
class EditRating(APIView):
  permission_classes = [IsAuthenticatedOrReadOnly]
  http_method_names = ['put']

  def put(self, request):
    rating = request.data
    test = Rating.objects.filter(id=request.data['id']).first()
    request.data["user"] = request.user.id
    serializer = RatingSerializer(test,data=rating, context={'request': request} )
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  


class MyFavoriteProducts(APIView):
  permission_classes = [IsAuthenticated]
  http_method_names = ['get', 'post', 'delete']

  def get(self, request):
    product_ids = FavoriteProduct.objects.filter(user=request.user).values('product_id')
    products = Product.objects.filter(id__in=product_ids)
    return Response(products.values(), status=status.HTTP_200_OK)
  
  def post(self, request):
    product_id = request.data

    product = get_object_or_404(Product, id=product_id)
    favoriteProduct = FavoriteProduct.objects.filter(user=request.user, product=product).first()
    if (favoriteProduct is None):
      favoriteProduct = FavoriteProduct(
        user = request.user,
        product = product
      )
      favoriteProduct.save()

    product_serializer = ProductSerializer(product)
    return Response(product_serializer.data, status=status.HTTP_201_CREATED)
  
  def delete(self, request, productid=None):
    favoriteProducts = FavoriteProduct.objects.filter(user=request.user, product_id=productid)
    favoriteProducts.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
