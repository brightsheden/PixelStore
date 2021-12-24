# Generated by Django 3.1.2 on 2021-11-03 20:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pixelstore', '0003_template_is_purchased'),
    ]

    operations = [
        migrations.CreateModel(
            name='Withdrawal',
            fields=[
                ('amount', models.IntegerField(blank=True, default=0, null=True)),
                ('accountName', models.CharField(blank=True, max_length=200, null=True)),
                ('accountBank_Name', models.CharField(blank=True, max_length=200, null=True)),
                ('accountBank_Number', models.IntegerField(blank=True, default=0, null=True)),
                ('is_success', models.BooleanField(default=False)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Wallets',
            fields=[
                ('amount', models.IntegerField(blank=True, default=0, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
