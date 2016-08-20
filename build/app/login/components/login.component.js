System.register(["@angular/core", '@angular/router', 'angular2-jwt', '@angular/forms', '@angular/http', 'angular2-notifications', '../services/login.service', '../models/login', '../../common/components/control.messages', '../../common/services/shared.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, angular2_jwt_1, forms_1, http_1, angular2_notifications_1, login_service_1, login_1, control_messages_1, shared_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (control_messages_1_1) {
                control_messages_1 = control_messages_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(router, http, formBuilder, _notificationService, _sharedService, _loginService) {
                    this.router = router;
                    this.http = http;
                    this.formBuilder = formBuilder;
                    this._notificationService = _notificationService;
                    this._sharedService = _sharedService;
                    this._loginService = _loginService;
                    this.isLogging = false;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.isLocked = false;
                    if (angular2_jwt_1.tokenNotExpired()) {
                        this.router.navigate(['/home']);
                    }
                    this.userLoginForm = this.formBuilder.group({
                        'username': ['', forms_1.Validators.required],
                        'password': ['', forms_1.Validators.required]
                    });
                }
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    if (this.userLoginForm.dirty && this.userLoginForm.valid) {
                        this._notificationService.alert('Giriş İşlemi', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                        this.isLogging = true;
                        this._loginService.login(new login_1.Login(this.userLoginForm.value.username, this.userLoginForm.value.password))
                            .subscribe(function (response) {
                            localStorage.setItem('id_token', response.token);
                            _this.router.navigate(['/home']);
                        }, function (error) {
                            var errorBody = JSON.parse(error._body);
                            _this.isLogging = false;
                            if (error.status === 401 && errorBody.exception === 'org.springframework.security.authentication.LockedException') {
                                _this.isLocked = true;
                            }
                            else if (error.status === 401 && errorBody.exception === 'org.springframework.security.authentication.BadCredentialsException') {
                                _this._notificationService.error('Geçersiz Giriş', 'Kullanıcı adı veya şifreniz hatalı', {});
                            }
                            else {
                                _this._notificationService.error('Bir Şeyler Yanlış Gitti', 'Şuan sisteme giriş yapılamıyor', {});
                            }
                        });
                    }
                };
                LoginComponent.prototype.showLogin = function () {
                    this.isLocked = false;
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: "login",
                        templateUrl: "./app/login/components/login.html",
                        styleUrls: ['./app/login/components/login.css'],
                        directives: [forms_1.REACTIVE_FORM_DIRECTIVES, angular2_notifications_1.SimpleNotificationsComponent, control_messages_1.ControlMessages],
                        providers: [angular2_notifications_1.NotificationsService, login_service_1.LoginService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http, forms_1.FormBuilder, angular2_notifications_1.NotificationsService, shared_service_1.SharedService, login_service_1.LoginService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});

//# sourceMappingURL=login.component.js.map
