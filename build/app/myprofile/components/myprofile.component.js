System.register(["@angular/core", '@angular/router', '@angular/forms', 'angular2-notifications', '../../common/services/validation.service', '../../common/components/loader.animation', '../../common/components/control.messages', '../services/myprofile.service', '../models/myprofile', '../../group/models/group'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1, angular2_notifications_1, validation_service_1, loader_animation_1, control_messages_1, myprofile_service_1, myprofile_1, group_1;
    var MyProfileComponent;
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
            function (myprofile_service_1_1) {
                myprofile_service_1 = myprofile_service_1_1;
            },
            function (myprofile_1_1) {
                myprofile_1 = myprofile_1_1;
            },
            function (group_1_1) {
                group_1 = group_1_1;
            }],
        execute: function() {
            MyProfileComponent = (function () {
                function MyProfileComponent(_myProfileService, formBuilder, _notificationService, router) {
                    this._myProfileService = _myProfileService;
                    this.formBuilder = formBuilder;
                    this._notificationService = _notificationService;
                    this.router = router;
                    this.isDataAvailable = false;
                    this.isSaving = false;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.myProfile = new myprofile_1.MyProfile();
                    this.myProfileForm = this.formBuilder.group({
                        'default_group_id': ['', forms_1.Validators.required],
                        'username': [''],
                        'email': ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
                        'passwords': this.formBuilder.group({
                            'password': ['', validation_service_1.ValidationService.passwordValidatorChange],
                            're_password': ['']
                        }, { validator: validation_service_1.ValidationService.passwordMatch })
                    });
                }
                MyProfileComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._myProfileService.load()
                        .subscribe(function (response) {
                        if (response.status === 'success') {
                            _this.myProfile = response.data;
                            _this.myProfileForm.controls.username.updateValue(response.data.username);
                            _this.myProfileForm.controls.email.updateValue(response.data.email);
                            _this.myProfileForm.controls.default_group_id.updateValue(response.data.group.id);
                            _this.isDataAvailable = true;
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                MyProfileComponent.prototype.defaultGroupSelector = function (value) {
                    this.defaultGroupIdValue = value;
                };
                MyProfileComponent.prototype.save = function () {
                    var _this = this;
                    var myProfile = new myprofile_1.MyProfile();
                    myProfile.email = this.myProfileForm.value.email;
                    myProfile.password = this.myProfileForm.value.passwords.password;
                    myProfile.group = new group_1.Group(this.defaultGroupIdValue, 'Selected');
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this.isSaving = true;
                    this._myProfileService.save(myProfile)
                        .subscribe(function (response) {
                        _this.isSaving = false;
                        if (response.status === 'success') {
                            _this._notificationService.success('İşlem Başarılı', 'Kullanıcı bilgileriniz güncellendi.', {});
                        }
                        else if (response.status === 'fail') {
                            if (response.message === 'user_email_exists') {
                                _this._notificationService.error('Hata', 'Girilen email adresi zaten kayıtlı.', {});
                            }
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                MyProfileComponent = __decorate([
                    core_1.Component({
                        selector: "myprofile",
                        templateUrl: "./app/myprofile/components/myprofile.html",
                        directives: [router_1.ROUTER_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, angular2_notifications_1.SimpleNotificationsComponent, control_messages_1.ControlMessages, loader_animation_1.LoaderAnimation],
                        providers: [myprofile_service_1.MyProfileService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [myprofile_service_1.MyProfileService, forms_1.FormBuilder, angular2_notifications_1.NotificationsService, router_1.Router])
                ], MyProfileComponent);
                return MyProfileComponent;
            }());
            exports_1("MyProfileComponent", MyProfileComponent);
        }
    }
});

//# sourceMappingURL=myprofile.component.js.map
