# Generated by Django 5.2.1 on 2025-05-26 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobapp', '0005_skill'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='category',
            field=models.CharField(choices=[('technical', 'Technical Skill'), ('language', 'Languages'), ('soft', 'Soft Skill'), ('tool', 'Tools')], max_length=20),
        ),
    ]
