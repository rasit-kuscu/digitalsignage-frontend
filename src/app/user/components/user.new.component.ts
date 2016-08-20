import { Component, OnInit } from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { ValidationService } from '../../common/services/validation.service';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { ControlMessages } from '../../common/components/control.messages';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Group } from '../../group/models/group';
import { GroupService } from '../../group/services/group.service';
import { Role } from '../../role/models/role';
import { RoleService } from '../../role/services/role.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: "user-new",
	templateUrl: "./app/user/components/user.new.html",
	directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, SimpleNotificationsComponent, ControlMessages, LoaderAnimation],
	providers: [UserService, GroupService, RoleService, NotificationsService]
})
export class UserNewComponent implements OnInit {
	notificationOptions = {timeOut: 5000, maxStack: 1};
	isSaving:boolean = false;
	isDataAvailable:boolean = false;
  defaultGroupIdValue:number;
  newUserForm:any;
	groupList:Group[];
	roleList:Role[];
	formGroupArr:FormControl[] = [];
	formRoleArr:FormControl[] = [];

  constructor(private _userService: UserService,
		private _groupService: GroupService,
		private _roleService: RoleService,
		private formBuilder: FormBuilder,
		private _notificationService: NotificationsService,
		public router:Router
		) {
  }

	ngOnInit() {
		Observable.forkJoin(
			this._groupService.load(),
			this._roleService.load()
		).subscribe(
      data => {
				if (data[0].status === 'success' && data[1].status === 'success') {
					this.groupList = data[0].data;
					this.roleList = data[1].data;

					this.populateCheckBoxes();
					this.prepareForm();

					this.isDataAvailable = true;
				}
			},
			error => {
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error._body)}]);
			}
		);
	}

	prepareForm() {
		this.newUserForm = this.formBuilder.group({
			'username': ['', Validators.required],
			'email': ['', [Validators.required, ValidationService.emailValidator]],
			'groups': this.formBuilder.group(this.formGroupArr, {validator: ValidationService.checkboxGroupValidator}),
			'roles': this.formBuilder.group(this.formRoleArr, {validator: ValidationService.checkboxGroupValidator}),
			'passwords': this.formBuilder.group({
				'password': ['', [Validators.required, ValidationService.passwordValidatorChange]],
				're_password': ['', Validators.required]
			}, {validator: ValidationService.passwordMatch})
		});
	}

	populateCheckBoxes() {
		for (let group of this.groupList) {
			group.isChecked = false;
			this.formGroupArr[group.id] = new FormControl('');
		}

		for (let role of this.roleList) {
			role.isChecked = false;
			this.formRoleArr[role.id] = new FormControl('');
		}
	}

	updateCheckedOptions(option, event) {
		if (option.isChecked) {
			option.isChecked = false;
		} else {
			option.isChecked = true;
		}
	}

	save() {
		let groups:number[] = [];
		let roles:number[] = [];

		for (let group of this.groupList) {
			if (group.isChecked) {
				groups.push(group.id);
			}
		}

		for (let role of this.roleList) {
			if (role.isChecked) {
				roles.push(role.id);
			}
		}

		this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', {timeOut:0, clickToClose:false});
		this.isSaving = true;
		this._userService.save(new User(0,
			this.newUserForm.value.username,
			this.newUserForm.value.email,
			this.newUserForm.value.passwords.password,
			groups,
			roles,
			true))
		.subscribe(
			(response) => {
				this.isSaving = false;
				if (response.status === 'success') {
					this.isSaving = true;
					this._notificationService.success('İşlem Başarılı', 'Kullanıcı başarıyla yaratıldı. Yönlendiriliyorsunuz.', {});
					this.router.navigate(['/management', 'user']);
				} else if (response.status === 'fail') {
					if (response.message === 'user_username_exists') {
						this._notificationService.error('Hata', 'Girilen kullanıcı adı kayıtlı.', {});
					} else if (response.message === 'user_email_exists') {
						this._notificationService.error('Hata', 'Girilen email adresi zaten kayıtlı.', {});
					}
				}
			},
			error => {
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error._body)}]);
			}
		);
	}
}
