from django.contrib import admin
from demo_api_app.models import Category, Product,Rating, FavoriteProduct

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Rating)

admin.site.register(FavoriteProduct)
