System.register(["@angular/core", '@angular/router', '@angular/forms', 'angular2-notifications', '../../common/services/validation.service', '../../common/components/loader.animation', '../../common/components/control.messages', '../services/user.service', '../models/service.user', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1, angular2_notifications_1, validation_service_1, loader_animation_1, control_messages_1, user_service_1, service_user_1;
    var ServiceEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            },
            function (loader_animation_1_1) {
                loader_animation_1 = loader_animation_1_1;
            },
            function (control_messages_1_1) {
                control_messages_1 = control_messages_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (service_user_1_1) {
                service_user_1 = service_user_1_1;
            },
            function (_1) {}],
        execute: function() {
            ServiceEditComponent = (function () {
                function ServiceEditComponent(_userService, formBuilder, _notificationService, router, activatedRoute) {
                    this._userService = _userService;
                    this.formBuilder = formBuilder;
                    this._notificationService = _notificationService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.isSaving = false;
                    this.isDataAvailable = false;
                }
                ServiceEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userService.service()
                        .subscribe(function (response) {
                        if (response.status === 'success') {
                            _this.serviceUser = response.data;
                            _this.serviceUserForm = _this.formBuilder.group({
                                'username': [_this.serviceUser['username'], forms_1.Validators.required],
                                'passwords': _this.formBuilder.group({
                                    'password': ['', validation_service_1.ValidationService.passwordValidatorChange],
                                    're_password': ['']
                                }, { validator: validation_service_1.ValidationService.passwordMatch })
                            });
                            _this.isDataAvailable = true;
                        }
                        else {
                            _this.router.navigate(['/error', { status: response.status, message: encodeURIComponent(response.message) }]);
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                ServiceEditComponent.prototype.save = function () {
                    var _this = this;
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this.isSaving = true;
                    this._userService.service_update(new service_user_1.ServiceUser(this.serviceUserForm.value.username, this.serviceUserForm.value.passwords.password, null))
                        .subscribe(function (response) {
                        _this.isSaving = false;
                        if (response.status === 'success') {
                            _this._notificationService.success('İşlem Başarılı', 'Servis kullanıcı bilgileri güncellendi.', {});
                            _this.serviceUser['enabled'] = response.data['enabled'];
                        }
                        else if (response.status === 'fail') {
                            if (response.message === 'user_username_exists') {
                                _this._notificationService.error('Hata', 'Bu kullanıcı adını kullanamazsınız.', {});
                            }
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                ServiceEditComponent = __decorate([
                    core_1.Component({
                        selector: "service-edit",
                        templateUrl: "./app/user/components/service.edit.html",
                        directives: [router_1.ROUTER_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, angular2_notifications_1.SimpleNotificationsComponent, control_messages_1.ControlMessages, loader_animation_1.LoaderAnimation],
                        providers: [user_service_1.UserService, angular2_notifications_1.NotificationsService],
                        styleUrls: ['./app/user/components/user.css'],
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, forms_1.FormBuilder, angular2_notifications_1.NotificationsService, router_1.Router, router_1.ActivatedRoute])
                ], ServiceEditComponent);
                return ServiceEditComponent;
            }());
            exports_1("ServiceEditComponent", ServiceEditComponent);
        }
    }
});

//# sourceMappingURL=service.edit.component.js.map
