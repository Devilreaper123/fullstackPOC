# Generated by Django 4.0.5 on 2022-08-03 08:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('PATIENTDATA', '0004_alter_patientnewdata_lastupdatedby'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientnewdata',
            name='LastUpdatedBy',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
