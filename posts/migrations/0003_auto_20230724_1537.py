# Generated by Django 3.2.6 on 2023-07-24 13:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20230724_1425'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='tag',
            field=models.ManyToManyField(blank=True, null=True, to='posts.Tag'),
        ),
        migrations.AlterField(
            model_name='tag',
            name='group',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='posts.tag'),
        ),
    ]
