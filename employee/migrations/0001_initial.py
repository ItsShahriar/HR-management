# Generated by Django 5.1.4 on 2025-02-01 03:37

import django.db.models.deletion
import phonenumber_field.modelfields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=125)),
                ('description', models.CharField(blank=True, max_length=125, null=True)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated')),
            ],
            options={
                'verbose_name': 'Department',
                'verbose_name_plural': 'Departments',
                'ordering': ['name', 'created'],
            },
        ),
        migrations.CreateModel(
            name='Nationality',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=125)),
                ('flag', models.ImageField(blank=True, null=True, upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated')),
            ],
            options={
                'verbose_name': 'Nationality',
                'verbose_name_plural': 'Nationality',
                'ordering': ['name', 'created'],
            },
        ),
        migrations.CreateModel(
            name='Religion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=125)),
                ('description', models.CharField(blank=True, max_length=125, null=True)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated')),
            ],
            options={
                'verbose_name': 'Religion',
                'verbose_name_plural': 'Religions',
                'ordering': ['name', 'created'],
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=125)),
                ('description', models.CharField(blank=True, max_length=125, null=True)),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated')),
            ],
            options={
                'verbose_name': 'Role',
                'verbose_name_plural': 'Roles',
                'ordering': ['name', 'created'],
            },
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(choices=[('Mr', 'Mr'), ('Mrs', 'Mrs'), ('Mss', 'Mss'), ('Dr', 'Dr'), ('Sir', 'Sir'), ('Madam', 'Madam')], default='Mr', max_length=10)),
                ('image', models.FileField(blank=True, default='default.png', help_text='upload image size less than 2.0MB', null=True, upload_to='profiles', verbose_name='Profile Image')),
                ('firstname', models.CharField(max_length=125, verbose_name='Firstname')),
                ('lastname', models.CharField(max_length=125, verbose_name='Lastname')),
                ('othername', models.CharField(blank=True, max_length=125, null=True, verbose_name='Othername (optional)')),
                ('sex', models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other'), ('Not Known', 'Not Known')], max_length=10)),
                ('email', models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Email (optional)')),
                ('tel', phonenumber_field.modelfields.PhoneNumberField(default='+8801712345678', help_text='Enter number with Country Code Eg. +8801712345678', max_length=128, region=None, verbose_name='Phone Number (Example +8801712345678)')),
                ('bio', models.CharField(blank=True, default='', help_text='your biography,tell me something about yourself eg. i love working ...', max_length=255, null=True, verbose_name='Bio')),
                ('birthday', models.DateField(verbose_name='Birthday')),
                ('hometown', models.CharField(blank=True, max_length=125, null=True, verbose_name='Hometown')),
                ('region', models.CharField(choices=[('East', 'East'), ('West', 'West'), ('North', 'North'), ('South', 'South')], help_text='what region of the country are you from ?', max_length=20, null=True, verbose_name='Region')),
                ('residence', models.CharField(max_length=125, verbose_name='Current Residence')),
                ('address', models.CharField(blank=True, help_text='address of current residence', max_length=125, null=True, verbose_name='Address')),
                ('education', models.CharField(choices=[('Senior High', 'Senior High School'), ('Junior High', 'Junior High School'), ('Primary Level', 'Primary School'), ('Bachelors', 'Bachelors/University/Polytechnic'), ('O-LEVEL', 'OLevel'), ('Other', 'Other')], default='Senior High', help_text='highest educational standard ie. your last level of schooling', max_length=20, null=True, verbose_name='Education')),
                ('lastwork', models.CharField(blank=True, help_text='where was the last place you worked ?', max_length=125, null=True, verbose_name='Last Place of Work')),
                ('position', models.CharField(blank=True, help_text='what position where you in your last place of work ?', max_length=255, null=True, verbose_name='Position Held')),
                ('nidnumber', models.CharField(blank=True, max_length=50, null=True, verbose_name='National ID Number')),
                ('tinnumber', models.CharField(blank=True, max_length=15, null=True, verbose_name='TIN')),
                ('startdate', models.DateField(help_text='date of employement', null=True, verbose_name='Employement Date')),
                ('employeetype', models.CharField(choices=[('Full-Time', 'Full-Time'), ('Part-Time', 'Part-Time'), ('Contract', 'Contract'), ('Intern', 'Intern')], default='Full-Time', max_length=15, null=True, verbose_name='Employee Type')),
                ('employeeid', models.CharField(blank=True, max_length=10, null=True, verbose_name='Employee ID Number')),
                ('dateissued', models.DateField(help_text='date staff id was issued', null=True, verbose_name='Date Issued')),
                ('is_blocked', models.BooleanField(default=False, help_text='button to toggle employee block and unblock', verbose_name='Is Blocked')),
                ('is_deleted', models.BooleanField(default=False, help_text='button to toggle employee deleted and undelete', verbose_name='Is Deleted')),
                ('created', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Created')),
                ('updated', models.DateTimeField(auto_now=True, null=True, verbose_name='Updated')),
                ('department', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='employee.department', verbose_name='Department')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('nationality', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='employee.nationality', verbose_name='Nationality')),
                ('religion', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='employee.religion', verbose_name='Religion')),
                ('role', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='employee.role', verbose_name='Role')),
            ],
            options={
                'verbose_name': 'Employee',
                'verbose_name_plural': 'Employees',
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='Emergency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(help_text='who should we contact ?', max_length=255, null=True, verbose_name='Fullname')),
                ('tel', phonenumber_field.modelfields.PhoneNumberField(default='+8801712345678', help_text='Enter number with Country Code Eg. +8801712345678', max_length=128, region=None, verbose_name='Phone Number (Example +8801712345678)')),
                ('location', models.CharField(max_length=125, null=True, verbose_name='Place of Residence')),
                ('relationship', models.CharField(choices=[('Father', 'Father'), ('Mother', 'Mother'), ('Sister', 'Sister'), ('Brother', 'Brother'), ('Uncle', 'Uncle'), ('Aunty', 'Aunty'), ('Husband', 'Husband'), ('Wife', 'Wife'), ('Fiance', 'Fiance'), ('Cousin', 'Cousin'), ('Fiancee', 'Fiancee'), ('Niece', 'Niece'), ('Nephew', 'Nephew'), ('Son', 'Son'), ('Daughter', 'Daughter')], default='Father', help_text='Who is this person to you ?', max_length=8, null=True, verbose_name='Relationship with Person')),
                ('created', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Created')),
                ('updated', models.DateTimeField(auto_now=True, null=True, verbose_name='Updated')),
                ('employee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='employee.employee')),
            ],
            options={
                'verbose_name': 'Emergency',
                'verbose_name_plural': 'Emergency',
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=125, null=True, verbose_name='Name of Bank')),
                ('account', models.CharField(help_text='employee account number', max_length=30, null=True, verbose_name='Account Number')),
                ('branch', models.CharField(blank=True, help_text='which branch was the account issue', max_length=125, null=True, verbose_name='Branch')),
                ('salary', models.DecimalField(decimal_places=2, help_text='This is the initial salary of employee', max_digits=16, null=True, verbose_name='Starting Salary')),
                ('created', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Created')),
                ('updated', models.DateTimeField(auto_now=True, null=True, verbose_name='Updated')),
                ('employee', models.ForeignKey(help_text='select employee(s) to add bank account', null=True, on_delete=django.db.models.deletion.CASCADE, to='employee.employee')),
            ],
            options={
                'verbose_name': 'Bank',
                'verbose_name_plural': 'Banks',
                'ordering': ['-name', '-account'],
            },
        ),
        migrations.CreateModel(
            name='Relationship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Married', 'Married'), ('Single', 'Single'), ('Divorced', 'Divorced'), ('Widow', 'Widow'), ('Widower', 'Widower')], default='Single', max_length=10, null=True, verbose_name='Marital Status')),
                ('spouse', models.CharField(blank=True, max_length=255, null=True, verbose_name='Spouse (Fullname)')),
                ('occupation', models.CharField(blank=True, help_text='spouse occupation', max_length=125, null=True, verbose_name='Occupation')),
                ('tel', phonenumber_field.modelfields.PhoneNumberField(blank=True, default=None, help_text='Enter number with Country Code Eg. +8801712345678', max_length=128, null=True, region=None, verbose_name='Spouse Phone Number (Example +8801712345678)')),
                ('children', models.PositiveIntegerField(blank=True, default=0, null=True, verbose_name='Number of Children')),
                ('nextofkin', models.CharField(help_text='fullname of next of kin', max_length=255, null=True, verbose_name='Next of Kin')),
                ('contact', phonenumber_field.modelfields.PhoneNumberField(blank=True, help_text='Phone Number of Next of Kin', max_length=128, null=True, region=None, verbose_name='Next of Kin Phone Number (Example +8801712345678)')),
                ('relationship', models.CharField(choices=[('Father', 'Father'), ('Mother', 'Mother'), ('Sister', 'Sister'), ('Brother', 'Brother'), ('Uncle', 'Uncle'), ('Aunty', 'Aunty'), ('Husband', 'Husband'), ('Wife', 'Wife'), ('Fiance', 'Fiance'), ('Cousin', 'Cousin'), ('Fiancee', 'Fiancee'), ('Niece', 'Niece'), ('Nephew', 'Nephew'), ('Son', 'Son'), ('Daughter', 'Daughter')], help_text='Who is this person to you ?', max_length=15, null=True, verbose_name='Relationship with Next of Person')),
                ('father', models.CharField(blank=True, max_length=255, null=True, verbose_name="Father's Name")),
                ('foccupation', models.CharField(blank=True, max_length=125, null=True, verbose_name="Father's Occupation")),
                ('mother', models.CharField(blank=True, max_length=255, null=True, verbose_name="Mother's Name")),
                ('moccupation', models.CharField(blank=True, max_length=125, null=True, verbose_name="Mother's Occupation")),
                ('created', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Created')),
                ('updated', models.DateTimeField(auto_now=True, null=True, verbose_name='Updated')),
                ('employee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='employee.employee')),
            ],
            options={
                'verbose_name': 'Relationship',
                'verbose_name_plural': 'Relationships',
                'ordering': ['created'],
            },
        ),
    ]
