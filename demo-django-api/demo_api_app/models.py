from django.contrib.auth.models import User
from django.db import models

class Category(models.Model):
  code = models.CharField(max_length=20)
  name = models.CharField(max_length=100, verbose_name = "nom")

  def __str__(self):
    return '({}) {} - {}'.format(self.id, self.code, self.name)

  class Meta:
    ordering = ('code', )
    verbose_name = "catégorie";



class Product(models.Model):
  code = models.CharField(max_length=20)
  name = models.CharField(max_length=100, verbose_name = "nom")
  description = models.CharField(max_length=200, default="")
  category = models.ForeignKey(Category, related_name='products', on_delete=models.PROTECT, verbose_name = "catégorie")
  
  def __str__(self):
    return '({}) {} - {}'.format(self.id, self.code, self.name)

  class Meta:
    ordering = ('code', )
    verbose_name = "produit";


class Rating(models.Model):
  
  ratingamount = models.IntegerField(default=0)
  user = models.ForeignKey(User, related_name='userid', on_delete=models.PROTECT, verbose_name = "userid")
  commentaire = models.CharField(max_length=200, default="")
  product = models.ForeignKey(Product, on_delete=models.PROTECT,verbose_name = "product",related_name='product')



class FavoriteProduct(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name = "utilisateur")
  product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name = "produit",related_name='produit')

  def __str__(self):
    return '({}) ({} {}) - {}'.format(self.id, self.user.first_name, self.user.last_name, self.product.name)

  class Meta:
    verbose_name = "produit favori";
    verbose_name_plural = "produits favoris"
