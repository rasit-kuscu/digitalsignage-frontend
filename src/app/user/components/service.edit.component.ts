import { Component, OnInit } from "@angular/core";
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { ValidationService } from '../../common/services/validation.service';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { ControlMessages } from '../../common/components/control.messages';
import { UserService } from '../services/user.service';
import { ServiceUser } from '../models/service.user';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: "service-edit",
    templateUrl: "./app/user/components/service.edit.html",
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, SimpleNotificationsComponent, ControlMessages, LoaderAnimation],
    providers: [UserService, NotificationsService],
    styleUrls: ['./app/user/components/user.css'],
})
export class ServiceEditComponent implements OnInit {
    notificationOptions = { timeOut: 5000, maxStack: 1 };
    isSaving: boolean = false;
    isDataAvailable: boolean = false;
    serviceUserForm: any;
    serviceUser: ServiceUser[];

    constructor(private _userService: UserService,
        private formBuilder: FormBuilder,
        private _notificationService: NotificationsService,
        public router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this._userService.service()
            .subscribe(
            response => {
                if (response.status === 'success') {
                    this.serviceUser = response.data;

                    this.serviceUserForm = this.formBuilder.group({
                        'username': [this.serviceUser['username'], Validators.required],
                        'passwords': this.formBuilder.group({
                            'password': ['', ValidationService.passwordValidatorChange],
                            're_password': ['']
                        }, { validator: ValidationService.passwordMatch })
                    });

                    this.isDataAvailable = true;
                } else {
                    this.router.navigate(['/error', { status: response.status, message: encodeURIComponent(response.message) }]);
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    save() {
        this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this.isSaving = true;

        this._userService.service_update(new ServiceUser(this.serviceUserForm.value.username,
            this.serviceUserForm.value.passwords.password, null))
            .subscribe(
            (response) => {
                this.isSaving = false;
                if (response.status === 'success') {
                    this._notificationService.success('İşlem Başarılı', 'Servis kullanıcı bilgileri güncellendi.', {});
                    this.serviceUser['enabled'] = response.data['enabled'];
                } else if (response.status === 'fail') {
                    if (response.message === 'user_username_exists') {
                        this._notificationService.error('Hata', 'Bu kullanıcı adını kullanamazsınız.', {});
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
}
