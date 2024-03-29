from django.urls import include, path
from rest_framework.routers import DefaultRouter

from demo_api_app import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet, basename='categories')
router.register(r'ratings', views.RatingViewSet, basename='ratings')
router.register(r'products', views.ProductViewSet, basename='products')

urlpatterns = [
  path('', include(router.urls)),
  path('get-all-categories', views.GetAllCategories.as_view()),
  path('get-all-ratings/<int:productid>', views.GetAllRatingbyproduct.as_view()),
  path('my-favorite-products', views.MyFavoriteProducts.as_view()),
  path('my-favorite-products/<int:productid>', views.MyFavoriteProducts.as_view()),
  path('createrating/', views.CreateRating.as_view()),
  path('editrating/', views.EditRating.as_view()),
]
