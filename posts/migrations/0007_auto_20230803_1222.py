# Generated by Django 3.2.6 on 2023-08-03 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_alter_post_tag'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='abbreviation',
            field=models.CharField(blank=True, default='', max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
    ]
