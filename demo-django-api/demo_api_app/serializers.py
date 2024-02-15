from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from demo_api_app.models import Category, Product, FavoriteProduct,Rating


class ProductSerializer(ModelSerializer):
  class Meta:
    model = Product
    fields = ('id', 'code', 'name', 'category','description')

class UserSerializer(ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'firstname', 'lastname','email')


class CategorySerializer(ModelSerializer):
  products = ProductSerializer(many=True, read_only=True)

  class Meta:
    model = Category
    fields = ('id', 'code', 'name', 'products')

class RatingSerializer(ModelSerializer):
  product = ProductSerializer(read_only=True)
  users = UserSerializer(read_only=True)

  class Meta:
    model = Rating
    fields = ('id', 'ratingamount', 'users', 'commentaire', 'product')



    