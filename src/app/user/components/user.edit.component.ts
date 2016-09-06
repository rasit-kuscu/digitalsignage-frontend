import { Component, OnInit } from "@angular/core";
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
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
    selector: "user-edit",
    templateUrl: "./app/user/components/user.edit.html",
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, SimpleNotificationsComponent, ControlMessages, LoaderAnimation],
    providers: [UserService, GroupService, RoleService, NotificationsService],
    styleUrls: ['./app/user/components/user.css'],
})
export class UserEditComponent implements OnInit {
    notificationOptions = { timeOut: 5000, maxStack: 1 };
    isSaving: boolean = false;
    isDataAvailable: boolean = false;
    defaultGroupIdValue: number;
    editUserForm: any;
    user: User[];
    userId: number;
    accountNonLocked: boolean;
    groupList: Group[];
    roleList: Role[];
    formGroupArr: FormControl[] = [];
    formRoleArr: FormControl[] = [];

    constructor(private _userService: UserService,
        private _groupService: GroupService,
        private _roleService: RoleService,
        private formBuilder: FormBuilder,
        private _notificationService: NotificationsService,
        public router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.userId = this.activatedRoute.snapshot.params['id'];
        Observable.forkJoin(
            this._userService.detail(this.userId),
            this._groupService.load(),
            this._roleService.load()
        ).subscribe(
            response => {
                if (response[0].status === 'success' && response[1].status === 'success' && response[2].status === 'success') {
                    this.user = response[0].data;
                    this.accountNonLocked = this.user['accountNonLocked'];
                    this.groupList = response[1].data;
                    this.roleList = response[2].data;

                    this.populateCheckBoxes();
                    this.prepareForm();
                    this.isDataAvailable = true;
                } else {
                    this.router.navigate(['/error', { status: response[0].status, message: encodeURIComponent(response[0].message) }]);
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    prepareForm() {
        this.editUserForm = this.formBuilder.group({
            'username': [this.user['username'], Validators.required],
            'email': [this.user['email'], [Validators.required, ValidationService.emailValidator]],
            'account_non_locked': [this.user['accountNonLocked'], Validators.required],
            'groups': this.formBuilder.group(this.formGroupArr, { validator: ValidationService.checkboxGroupValidator }),
            'roles': this.formBuilder.group(this.formRoleArr, { validator: ValidationService.checkboxGroupValidator }),
            'passwords': this.formBuilder.group({
                'password': ['', ValidationService.passwordValidatorChange],
                're_password': ['']
            }, { validator: ValidationService.passwordMatch })
        });
    }

    populateCheckBoxes() {
        for (let group of this.groupList) {
            let index = this.user['groups'].map(function(x) { return x.id; }).indexOf(group.id);
            if (index >= 0) {
                group.isChecked = true;
            } else {
                group.isChecked = false;
            }
            this.formGroupArr[group.id] = new FormControl(true);
        }

        for (let role of this.roleList) {
            let index = this.user['roles'].map(function(x) { return x.id; }).indexOf(role.id);
            if (index >= 0) {
                role.isChecked = true;
            } else {
                role.isChecked = false;
            }
            this.formRoleArr[role.id] = new FormControl(true);
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
        let groups: number[] = [];
        let roles: number[] = [];

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

        if (this.accountNonLocked) {
            this.user['loginAttempt'] = null;
        }

        this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this.isSaving = true;
        this._userService.update(new User(this.userId,
            this.editUserForm.value.username,
            this.editUserForm.value.email,
            this.editUserForm.value.passwords.password,
            groups,
            roles,
            this.accountNonLocked))
            .subscribe(
            (response) => {
                this.isSaving = false;
                if (response.status === 'success') {
                    this._notificationService.success('İşlem Başarılı', 'Kullanıcı bilgileri güncellendi.', {});
                } else if (response.status === 'fail') {
                    if (response.message === 'user_username_exists') {
                        this._notificationService.error('Hata', 'Girilen kullanıcı adı kayıtlı.', {});
                    } else if (response.message === 'user_email_exists') {
                        this._notificationService.error('Hata', 'Girilen email adresi zaten kayıtlı.', {});
                    }
                } else {
                    this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    defaultStatusSelector(value) {
        this.accountNonLocked = value;
    }
}
