# Generated by Django 2.0.7 on 2018-10-20 05:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sistema', '0016_auto_20181020_0232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='actualXp',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='highestScoreBreakout',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='highestScoreFishing',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='highestScoreFlappyBird',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='highestScoreGuitarHero',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='highestScoreMaze',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='highestScorePong',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='level',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='playerX',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='playerY',
            field=models.IntegerField(null=True),
        ),
    ]