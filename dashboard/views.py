from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models import Q
import datetime  
from django.core.mail import send_mail
from django.contrib import messages
from django.urls import reverse
from employee.forms import EmployeeCreateForm,EmergencyCreateForm,FamilyCreateForm,BankAccountCreation
from leave.models import Leave
from employee.models import *
from leave.forms import LeaveCreationForm

def dashboard(request):
	
	dataset = dict()
	user = request.user

	if not request.user.is_authenticated:
		return redirect('accounts:login')

	employees = Employee.objects.all()
	leaves = Leave.objects.all_pending_leaves()
	employees_birthday = Employee.objects.birthdays_current_month()
	staff_leaves = Leave.objects.filter(user = user)

	
	dataset['employees'] = employees
	dataset['leaves'] = leaves
	dataset['employees_birthday'] = employees_birthday
	dataset['staff_leaves'] = staff_leaves
	dataset['title'] = 'summary'
	

	return render(request,'dashboard/dashboard_index.html',dataset)

def dashboard_employees(request):
	if not (request.user.is_authenticated and request.user.is_superuser and request.user.is_staff):
		return redirect('/')

	dataset = dict()
	departments = Department.objects.all()
	employees = Employee.objects.all()

	query = request.GET.get('search')
	if query:
		employees = employees.filter(
			Q(firstname__icontains = query) |
			Q(lastname__icontains = query)
		)

	paginator = Paginator(employees, 10)

	page = request.GET.get('page')
	employees_paginated = paginator.get_page(page)


	dataset['employee_list'] = employees_paginated
	dataset['departments'] = departments
	dataset['all_employees'] = Employee.objects.all_employees()

	blocked_employees = Employee.objects.all_blocked_employees()

	dataset['blocked_employees'] = blocked_employees
	dataset['title'] = 'Employees list view'
	return render(request,'dashboard/employee_app.html',dataset)

def dashboard_employees_create(request):
	if not (request.user.is_authenticated and request.user.is_superuser and request.user.is_staff):
		return redirect('/')

	if request.method == 'POST':
		form = EmployeeCreateForm(request.POST,request.FILES)
		if form.is_valid():
			instance = form.save(commit = False)
			user = request.POST.get('user')
			assigned_user = User.objects.get(id = user)

			instance.user = assigned_user

			instance.title = request.POST.get('title')
			instance.image = request.FILES.get('image')
			instance.firstname = request.POST.get('firstname')
			instance.lastname = request.POST.get('lastname')
			instance.othername = request.POST.get('othername')
			instance.sex = request.POST.get('sex')
			instance.bio = request.POST.get('bio')
			instance.birthday = request.POST.get('birthday')

			religion_id = request.POST.get('religion')
			religion = Religion.objects.get(id = religion_id)
			instance.religion = religion

			nationality_id = request.POST.get('nationality')
			nationality = Nationality.objects.get(id = nationality_id)
			instance.nationality = nationality

			department_id = request.POST.get('department')
			department = Department.objects.get(id = department_id)
			instance.department = department


			instance.hometown = request.POST.get('hometown')
			instance.region = request.POST.get('region')
			instance.residence = request.POST.get('residence')
			instance.address = request.POST.get('address')
			instance.education = request.POST.get('education')
			instance.lastwork = request.POST.get('lastwork')
			instance.position = request.POST.get('position')
			instance.nidnumber = request.POST.get('nidnumber')
			instance.tinnumber = request.POST.get('tinnumber')

			role = request.POST.get('role')
			role_instance = Role.objects.get(id = role)
			instance.role = role_instance

			instance.startdate = request.POST.get('startdate')
			instance.employeetype = request.POST.get('employeetype')
			instance.employeeid = request.POST.get('employeeid')
			instance.dateissued = request.POST.get('dateissued')

			instance.save()

			return  redirect('dashboard:employees')
		else:
			messages.error(request,'Trying to create dublicate employees with a single user account ',extra_tags = 'alert alert-warning alert-dismissible show')
			return redirect('dashboard:employeecreate')


	dataset = dict()
	form = EmployeeCreateForm()
	dataset['form'] = form
	dataset['title'] = 'register employee'
	return render(request,'dashboard/employee_create.html',dataset)

def employee_edit_data(request,id):
	if not (request.user.is_authenticated and request.user.is_superuser and request.user.is_staff):
		return redirect('/')
	employee = get_object_or_404(Employee, id = id)
	if request.method == 'POST':
		form = EmployeeCreateForm(request.POST or None,request.FILES or None,instance = employee)
		if form.is_valid():
			instance = form.save(commit = False)

			user = request.POST.get('user')
			assigned_user = User.objects.get(id = user)

			instance.user = assigned_user

			instance.title = request.POST.get('title')
			instance.image = request.FILES.get('image')
			instance.firstname = request.POST.get('firstname')
			instance.lastname = request.POST.get('lastname')
			instance.othername = request.POST.get('othername')
			instance.sex = request.POST.get('sex')
			instance.bio = request.POST.get('bio')
			instance.birthday = request.POST.get('birthday')

			religion_id = request.POST.get('religion')
			religion = Religion.objects.get(id = religion_id)
			instance.religion = religion

			nationality_id = request.POST.get('nationality')
			nationality = Nationality.objects.get(id = nationality_id)
			instance.nationality = nationality

			department_id = request.POST.get('department')
			department = Department.objects.get(id = department_id)
			instance.department = department


			instance.hometown = request.POST.get('hometown')
			instance.region = request.POST.get('region')
			instance.residence = request.POST.get('residence')
			instance.address = request.POST.get('address')
			instance.education = request.POST.get('education')
			instance.lastwork = request.POST.get('lastwork')
			instance.position = request.POST.get('position')
			instance.nidnumber = request.POST.get('nidnumber')
			instance.tinnumber = request.POST.get('tinnumber')

			role = request.POST.get('role')
			role_instance = Role.objects.get(id = role)
			instance.role = role_instance

			instance.startdate = request.POST.get('startdate')
			instance.employeetype = request.POST.get('employeetype')
			instance.employeeid = request.POST.get('employeeid')
			instance.dateissued = request.POST.get('dateissued')

			instance.save()
			messages.success(request,'Account Updated Successfully !!!',extra_tags = 'alert alert-success alert-dismissible show')
			return redirect('dashboard:employees')

		else:

			messages.error(request,'Error Updating account',extra_tags = 'alert alert-warning alert-dismissible show')
			return HttpResponse("Form data not valid")

	dataset = dict()
	form = EmployeeCreateForm(request.POST or None,request.FILES or None,instance = employee)
	dataset['form'] = form
	dataset['title'] = 'edit - {0}'.format(employee.get_full_name)
	return render(request,'dashboard/employee_create.html',dataset)

def dashboard_employee_info(request,id):
	if not request.user.is_authenticated:
		return redirect('/')
	
	employee = get_object_or_404(Employee, id = id)
	employee_emergency_instance = Emergency.objects.filter(employee = employee).first()
	employee_family_instance = Relationship.objects.filter(employee = employee).first()
	bank_instance = Bank.objects.filter(employee = employee).first()
	
	dataset = dict()
	dataset['employee'] = employee
	dataset['emergency'] = employee_emergency_instance
	dataset['family'] = employee_family_instance
	dataset['bank'] = bank_instance
	dataset['title'] = 'profile - {0}'.format(employee.get_full_name)
	return render(request,'dashboard/employee_detail.html',dataset)


def dashboard_emergency_create(request):
    if not (request.user.is_authenticated and request.user.is_superuser and request.user.is_staff):
        return redirect('/')
    
    emp_name = None  

    if request.method == 'POST':
        form = EmergencyCreateForm(data=request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            employee_id = request.POST.get('employee')

            if employee_id:
                employee_object = Employee.objects.get(id=employee_id)
                emp_name = employee_object.get_full_name  
                
                instance.employee = employee_object
                instance.fullname = request.POST.get('fullname')
                instance.tel = request.POST.get('tel')
                instance.location = request.POST.get('location')
                instance.relationship = request.POST.get('relationship')

                instance.save()

                messages.success(request, f'Emergency Successfully Created for {emp_name}', extra_tags='alert alert-success alert-dismissible show')
                return redirect('dashboard:emergencycreate')
            else:
                messages.error(request, 'Employee ID is missing.', extra_tags='alert alert-warning alert-dismissible show')
                return redirect('dashboard:emergencycreate')

        error_message = 'Error Creating Emergency'
        if emp_name:
            error_message += f' for {emp_name}'

        messages.error(request, error_message, extra_tags='alert alert-warning alert-dismissible show')
        return redirect('dashboard:emergencycreate')

    dataset = {'form': EmergencyCreateForm(), 'title': 'Create Emergency'}
    return render(request, 'dashboard/emergency_create.html', dataset)


def dashboard_emergency_update(request,id):
	if not (request.user.is_authenticated and request.user.is_superuser):
		return redirect('/')

	emergency = get_object_or_404(Emergency, id = id)
	employee = emergency.employee
	if request.method == 'POST':
		form = EmergencyCreateForm( data = request.POST, instance = emergency)
		if form.is_valid():
			instance = form.save(commit = False)
			instance.employee = employee
			instance.fullname = request.POST.get('fullname')
			instance.tel = request.POST.get('tel')
			instance.location = request.POST.get('location')
			instance.relationship = request.POST.get('relationship')

			instance.save()

			messages.success(request,'Emergency Details Successfully Updated',extra_tags = 'alert alert-success alert-dismissible show')

			return redirect('dashboard:employeeinfo',id = employee.id)

	dataset = dict()
	form = EmergencyCreateForm(request.POST or None,instance = emergency)
	dataset['form'] = form
	dataset['title'] = 'Updating Emergency Details for {0}'.format(employee.get_full_name)
	return render(request,'dashboard/emergency_create.html',dataset)


def dashboard_family_create(request):
    
    if not (request.user.is_authenticated and request.user.is_superuser and request.user.is_staff):
        return redirect('/')
    
    if request.method == 'POST':
        form = FamilyCreateForm(data=request.POST or None)
        employee_object = None  

        if form.is_valid():
            instance = form.save(commit=False)
            employee_id = request.POST.get('employee')

            if employee_id:
                employee_object = get_object_or_404(Employee, id=employee_id)
                instance.employee = employee_object
                instance.status = request.POST.get('status')
                instance.spouse = request.POST.get('spouse')
                instance.occupation = request.POST.get('occupation')
                instance.tel = request.POST.get('tel')
                instance.children = request.POST.get('children')
                instance.father = request.POST.get('father')
                instance.foccupation = request.POST.get('foccupation')
                instance.mother = request.POST.get('mother')
                instance.moccupation = request.POST.get('moccupation')

                instance.save()

                messages.success(request, f'Relationship Successfully Created for {employee_object}', extra_tags='alert alert-success alert-dismissible show')
                return redirect('dashboard:familycreate')
            else:
                print("Form errors:", form.errors)
                messages.error(request, 'Employee ID is missing.', extra_tags='alert alert-warning alert-dismissible show')
                return redirect('dashboard:familycreate')

        messages.error(request, 'Failed to create Relationship.', extra_tags='alert alert-warning alert-dismissible show')
        return redirect('dashboard:familycreate')

    dataset = {
        'form': FamilyCreateForm(),
        'title': 'RELATIONSHIP CREATE FORM'
    }
    
    return render(request, 'dashboard/family_create_form.html', dataset)

def dashboard_family_edit(request,id):
	if not (request.user.is_authenticated and request.user.is_authenticated):
		return redirect('/')
	relation = get_object_or_404(Relationship, id = id)
	employee = relation.employee

	if request.method == 'POST':
		form = FamilyCreateForm(data = request.POST, instance = relation)
		if form.is_valid():
			instance = form.save(commit = False)
			instance.employee = employee
			instance.status = request.POST.get('status')
			instance.spouse = request.POST.get('spouse')
			instance.occupation = request.POST.get('occupation')
			instance.tel = request.POST.get('tel')
			instance.children = request.POST.get('children')

			instance.nextofkin = request.POST.get('nextofkin')
			instance.contact = request.POST.get('contact')
			instance.relationship = request.POST.get('relationship')

			instance.father = request.POST.get('father')
			instance.foccupation = request.POST.get('foccupation')
			instance.mother = request.POST.get('mother')
			instance.moccupation = request.POST.get('moccupation')

			instance.save()

			messages.success(request,'Relationship Successfully Updated for {0}'.format(employee.get_full_name),extra_tags = 'alert alert-success alert-dismissible show')
			return redirect('dashboard:familycreate')

		else:
			messages.error(request,'Failed to update Relationship for {0}'.format(employee.get_full_name),extra_tags = 'alert alert-warning alert-dismissible show')
			return redirect('dashboard:familycreate')

	dataset = dict()

	form = FamilyCreateForm(request.POST or None,instance = relation)

	dataset['form'] = form
	dataset['title'] = 'RELATIONSHIP UPDATE FORM'
	return render(request,'dashboard/family_create_form.html',dataset)

def dashboard_bank_create(request):
	if not (request.user.is_authenticated and request.user.is_superuser and request.user.is_staff):
		return redirect('/')
	if request.method == 'POST':
		form = BankAccountCreation(data = request.POST)
		if form.is_valid():
			instance = form.save(commit = False)
			employee_id = request.POST.get('employee')
			employee_object = get_object_or_404(Employee,id = employee_id)

			instance.employee = employee_object
			instance.name = request.POST.get('name')
			instance.branch = request.POST.get('branch')
			instance.account = request.POST.get('account')
			instance.salary = request.POST.get('salary')
			instance.save()

			messages.success(request,'Account Successfully Created for {0}'.format(employee_object.get_full_name),extra_tags = 'alert alert-success alert-dismissible show')
			return redirect('dashboard:bankaccountcreate')
		else:
			messages.error(request,'Error Creating Account for {0}'.format(employee_object.get_full_name),extra_tags = 'alert alert-warning alert-dismissible show')
			return redirect('dashboard:bankaccountcreate')

	dataset = dict()

	form = BankAccountCreation()
	
	dataset['form'] = form
	dataset['title'] = 'Account Creation Form'
	return render(request,'dashboard/bank_account_create_form.html',dataset)

def employee_bank_account_update(request,id):
	if not (request.user.is_superuser and request.user.is_authenticated):
		return redirect('/')
	bank_instance_obj = get_object_or_404(Bank, id = id)
	employee = bank_instance_obj.employee

	if request.method == 'POST':
		form = BankAccountCreation(request.POST, instance = bank_instance_obj)
		if form.is_valid():
			instance = form.save(commit = False)
			instance.employee = employee

			instance.name = request.POST.get('name')
			instance.branch = request.POST.get('branch')
			instance.account = request.POST.get('account')
			instance.salary = request.POST.get('salary')
			instance.save()

			messages.success(request,'Account Successfully Edited for {0}'.format(employee.get_full_name),extra_tags = 'alert alert-success alert-dismissible show')
			return redirect('dashboard:bankaccountcreate')
		else:
			messages.error(request,'Error Updating Account for {0}'.format(employee.get_full_name),extra_tags = 'alert alert-warning alert-dismissible show')
			return redirect('dashboard:bankaccountcreate')


	dataset = dict()

	form = BankAccountCreation(request.POST or None,instance = bank_instance_obj)
	
	dataset['form'] = form
	dataset['title'] = 'Update Bank Account'
	return render(request,'dashboard/bank_account_create_form.html',dataset)

def leave_creation(request):
	if not request.user.is_authenticated:
		return redirect('accounts:login')
	if request.method == 'POST':
		form = LeaveCreationForm(data = request.POST)
		if form.is_valid():
			instance = form.save(commit = False)
			user = request.user
			instance.user = user
			instance.save()

			messages.success(request,'Leave Request Sent,wait for Human Resource Managers response',extra_tags = 'alert alert-success alert-dismissible show')
			return redirect('dashboard:createleave')

		messages.error(request,'failed to Request a Leave,please check entry dates',extra_tags = 'alert alert-warning alert-dismissible show')
		return redirect('dashboard:createleave')

	dataset = dict()
	form = LeaveCreationForm()
	dataset['form'] = form
	dataset['title'] = 'Apply for Leave'
	return render(request,'dashboard/create_leave.html',dataset)

def leaves_list(request):
	if not (request.user.is_staff and request.user.is_superuser):
		return redirect('/')
	leaves = Leave.objects.all_pending_leaves()
	return render(request,'dashboard/leaves_recent.html',{'leave_list':leaves,'title':'leaves list - pending'})

def leaves_approved_list(request):
	if not (request.user.is_superuser and request.user.is_staff):
		return redirect('/')
	leaves = Leave.objects.all_approved_leaves() 
	return render(request,'dashboard/leaves_approved.html',{'leave_list':leaves,'title':'approved leave list'})

def leaves_view(request,id):
	if not (request.user.is_authenticated):
		return redirect('/')

	leave = get_object_or_404(Leave, id = id)
	employee = Employee.objects.filter(user = leave.user).first()
	print(employee)
	return render(request,'dashboard/leave_detail_view.html',{'leave':leave,'employee':employee,'title':'{0}-{1} leave'.format(leave.user.username,leave.status)})

def approve_leave(request,id):
	if not (request.user.is_superuser and request.user.is_authenticated):
		return redirect('/')
	leave = get_object_or_404(Leave, id = id)
	user = leave.user
	employee = Employee.objects.filter(user = user)[0]
	leave.approve_leave

	messages.error(request,'Leave successfully approved for {0}'.format(employee.get_full_name),extra_tags = 'alert alert-success alert-dismissible show')
	return redirect('dashboard:userleaveview', id = id)

def cancel_leaves_list(request):
	if not (request.user.is_superuser and request.user.is_authenticated):
		return redirect('/')
	leaves = Leave.objects.all_cancel_leaves()
	return render(request,'dashboard/leaves_cancel.html',{'leave_list_cancel':leaves,'title':'Cancel leave list'})

def unapprove_leave(request,id):
	if not (request.user.is_authenticated and request.user.is_superuser):
		return redirect('/')
	leave = get_object_or_404(Leave, id = id)
	leave.unapprove_leave
	return redirect('dashboard:leaveslist') 

def cancel_leave(request,id):
	if not (request.user.is_superuser and request.user.is_authenticated):
		return redirect('/')
	leave = get_object_or_404(Leave, id = id)
	leave.leaves_cancel

	messages.success(request,'Leave is canceled',extra_tags = 'alert alert-success alert-dismissible show')
	return redirect('dashboard:canceleaveslist')

def uncancel_leave(request,id):
	if not (request.user.is_superuser and request.user.is_authenticated):
		return redirect('/')
	leave = get_object_or_404(Leave, id = id)
	leave.status = 'pending'
	leave.is_approved = False
	leave.save()
	messages.success(request,'Leave is uncanceled,now in pending list',extra_tags = 'alert alert-success alert-dismissible show')
	return redirect('dashboard:canceleaveslist')

def leave_rejected_list(request):

	dataset = dict()
	leave = Leave.objects.all_rejected_leaves()

	dataset['leave_list_rejected'] = leave
	return render(request,'dashboard/rejected_leaves_list.html',dataset)

def reject_leave(request,id):
	dataset = dict()
	leave = get_object_or_404(Leave, id = id)
	leave.reject_leave
	messages.success(request,'Leave is rejected',extra_tags = 'alert alert-success alert-dismissible show')
	return redirect('dashboard:leavesrejected')

def unreject_leave(request,id):
	leave = get_object_or_404(Leave, id = id)
	leave.status = 'pending'
	leave.is_approved = False
	leave.save()
	messages.success(request,'Leave is now in pending list ',extra_tags = 'alert alert-success alert-dismissible show')

	return redirect('dashboard:leavesrejected')

def view_my_leave_table(request):
	if request.user.is_authenticated:
		user = request.user
		leaves = Leave.objects.filter(user = user)
		employee = Employee.objects.filter(user = user).first()
		print(leaves)
		dataset = dict()
		dataset['leave_list'] = leaves
		dataset['employee'] = employee
		dataset['title'] = 'Leaves List'
	else:
		return redirect('accounts:login')
	return render(request,'dashboard/staff_leaves_table.html',dataset)

def birthday_this_month(request):	
	if not request.user.is_authenticated:
		return redirect('/')

	employees = Employee.objects.birthdays_current_month()
	month = datetime.date.today().strftime('%B')
	context = {
	'birthdays':employees,
	'month':month,
	'count_birthdays':employees.count(),
	'title':'Birthdays'
	}
	return render(request,'dashboard/birthdays_this_month.html',context)

