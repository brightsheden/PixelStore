# Generated by Django 4.0 on 2021-12-25 23:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pixelstore', '0007_auto_20211216_0829'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='wallet',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True),
        ),
    ]