# Generated by Django 5.2.1 on 2025-05-27 02:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobapp', '0006_alter_skill_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='education',
            name='jobuser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='educations', to='jobapp.jobuser'),
        ),
        migrations.AlterField(
            model_name='experience',
            name='jobuser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='experiences', to='jobapp.jobuser'),
        ),
        migrations.AlterField(
            model_name='skill',
            name='category',
            field=models.CharField(choices=[('soft', 'Soft Skill'), ('tool', 'Tools'), ('language', 'Languages'), ('technical', 'Technical Skill')], max_length=20),
        ),
        migrations.AlterField(
            model_name='skill',
            name='jobuser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='skills', to='jobapp.jobuser'),
        ),
    ]
