# Generated by Django 5.0.2 on 2024-02-13 21:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('demo_api_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favoriteproduct',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='produit', to='demo_api_app.product', verbose_name='produit'),
        ),
        migrations.AlterField(
            model_name='rating',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='demo_api_app.product', verbose_name='product'),
        ),
    ]