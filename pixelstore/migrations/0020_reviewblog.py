# Generated by Django 3.1.2 on 2022-03-01 14:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pixelstore', '0019_blog'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReviewBlog',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('blog', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='pixelstore.blog')),
            ],
        ),
    ]