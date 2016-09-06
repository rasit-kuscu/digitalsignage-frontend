import { Component, OnInit } from "@angular/core";
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { ValidationService } from '../../common/services/validation.service';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { ControlMessages } from '../../common/components/control.messages';
import { MyProfileService } from '../services/myprofile.service';
import { MyProfile } from '../models/myprofile';
import { Group } from '../../group/models/group';

@Component({
    selector: "myprofile",
    templateUrl: "./app/myprofile/components/myprofile.html",
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, SimpleNotificationsComponent, ControlMessages, LoaderAnimation],
    providers: [MyProfileService, NotificationsService]
})
export class MyProfileComponent implements OnInit {
    isDataAvailable: boolean = false;
    isSaving: boolean = false;
    defaultGroupIdValue: number;
    myProfileForm: any;
    notificationOptions = { timeOut: 5000, maxStack: 1 };
    myProfile: MyProfile = new MyProfile();

    constructor(private _myProfileService: MyProfileService,
        private formBuilder: FormBuilder,
        private _notificationService: NotificationsService,
        private router: Router
    ) {
        this.myProfileForm = this.formBuilder.group({
            'default_group_id': ['', Validators.required],
            'username': [''],
            'email': ['', [Validators.required, ValidationService.emailValidator]],
            'passwords': this.formBuilder.group({
                'password': ['', ValidationService.passwordValidatorChange],
                're_password': ['']
            }, { validator: ValidationService.passwordMatch })
        });
    }

    ngOnInit() {
        this._myProfileService.load()
            .subscribe(
            (response) => {
                if (response.status === 'success') {
                    this.myProfile = response.data;
                    this.myProfileForm.controls.username.updateValue(response.data.username);
                    this.myProfileForm.controls.email.updateValue(response.data.email);
                    this.myProfileForm.controls.default_group_id.updateValue(response.data.group.id);
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

    defaultGroupSelector(value) {
        this.defaultGroupIdValue = value;
    }

    save() {
        let myProfile = new MyProfile();
        myProfile.email = this.myProfileForm.value.email;
        myProfile.password = this.myProfileForm.value.passwords.password;
        myProfile.group = new Group(this.defaultGroupIdValue, 'Selected');

        this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this.isSaving = true;
        this._myProfileService.save(myProfile)
            .subscribe(
            (response) => {
                this.isSaving = false;
                if (response.status === 'success') {
                    this._notificationService.success('İşlem Başarılı', 'Kullanıcı bilgileriniz güncellendi.', {});
                } else if (response.status === 'fail') {
                    if (response.message === 'user_email_exists') {
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
}
