# Generated by Django 4.0.5 on 2022-08-03 09:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PATIENTDATA', '0005_alter_patientnewdata_lastupdatedby'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientnewdata',
            name='LastUpdatedBy',
            field=models.CharField(max_length=120),
        ),
    ]