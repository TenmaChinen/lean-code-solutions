# Generated by Django 3.2.6 on 2023-07-24 12:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='post',
            name='idx',
        ),
        migrations.RemoveField(
            model_name='post',
            name='total_seconds',
        ),
        migrations.AddField(
            model_name='post',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='creation_date',
            field=models.DateField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='title',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=32)),
                ('group', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sub_tags', to='posts.tag')),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='tag',
            field=models.ManyToManyField(null=True, to='posts.Tag'),
        ),
    ]