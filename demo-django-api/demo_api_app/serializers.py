from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth.models import User
from demo_api_app.models import Category, Product, FavoriteProduct, Rating
from demo_auth_app.serializers import UserSerializer


class ProductSerializer(ModelSerializer):
  class Meta:
    model = Product
    fields = ('id', 'code', 'name', 'category','description')

#class UserSerializer(ModelSerializer):
 # class Meta:
  #  model = User
   # fields = ('id', 'username', 'firstname', 'lastname','email')


class CategorySerializer(ModelSerializer):
  products = ProductSerializer(many=True, read_only=True)

  class Meta:
    model = Category
    fields = ('id', 'code', 'name', 'products')

class RatingSerializer(ModelSerializer):
  #product = ProductSerializer(read_only=True)
  #user = UserSerializer(read_only=True)
  user_name = SerializerMethodField()

  class Meta:
    model = Rating
    fields = ('id', 'ratingamount', 'user', 'user_name', 'commentaire', 'product')

  def get_user_name(self, rating):
    return rating.user.first_name + ' ' + rating.user.last_name
  
    