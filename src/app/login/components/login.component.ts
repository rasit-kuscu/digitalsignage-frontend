import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { LoginService } from '../services/login.service';
import { Login } from '../models/login';
import { ControlMessages } from '../../common/components/control.messages';
import { SharedService } from '../../common/services/shared.service';

@Component({
    selector: "login",
    templateUrl: "./app/login/components/login.html",
    styleUrls: ['./app/login/components/login.css'],
    directives: [REACTIVE_FORM_DIRECTIVES, SimpleNotificationsComponent, ControlMessages],
    providers: [NotificationsService, LoginService]
})
export class LoginComponent {
    isLogging: boolean = false;
    notificationOptions = { timeOut: 5000, maxStack: 1 };
    userLoginForm: any;
    isLocked: boolean = false;

    constructor(public router: Router,
        public http: Http,
        private formBuilder: FormBuilder,
        private _notificationService: NotificationsService,
        public _sharedService: SharedService,
        private _loginService: LoginService) {
        if (tokenNotExpired()) {
            this.router.navigate(['/home']);
        }
        this.userLoginForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    login() {
        if (this.userLoginForm.dirty && this.userLoginForm.valid) {
            this._notificationService.alert('Giriş İşlemi', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
            this.isLogging = true;
            this._loginService.login(new Login(this.userLoginForm.value.username, this.userLoginForm.value.password))
                .subscribe(
                response => {
                    localStorage.setItem('id_token', response.token);
                    this.router.navigate(['/home']);
                },
                error => {
                    let errorBody = JSON.parse(error._body);
                    this.isLogging = false;
                    if (error.status === 401 && errorBody.exception === 'org.springframework.security.authentication.LockedException') {
                        this.isLocked = true;
                    } else if (error.status === 401 && errorBody.exception === 'org.springframework.security.authentication.BadCredentialsException') {
                        this._notificationService.error('Geçersiz Giriş', 'Kullanıcı adı veya şifreniz hatalı', {});
                    } else {
                        this._notificationService.error('Bir Şeyler Yanlış Gitti', 'Şuan sisteme giriş yapılamıyor', {});
                    }
                }
                );
        }
    }

    showLogin() {
        this.isLocked = false;
    }
}
