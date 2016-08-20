System.register(["@angular/core", '@angular/router', '@angular/forms', 'notifications', '../../common/services/validation.service', '../../common/components/loader.animation', '../../common/components/permission.denied', '../../common/components/control.messages', '../services/myprofile.service', '../models/myprofile'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1, notifications_1, validation_service_1, loader_animation_1, permission_denied_1, control_messages_1, myprofile_service_1, myprofile_1;
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
            function (notifications_1_1) {
                notifications_1 = notifications_1_1;
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            },
            function (loader_animation_1_1) {
                loader_animation_1 = loader_animation_1_1;
            },
            function (permission_denied_1_1) {
                permission_denied_1 = permission_denied_1_1;
            },
            function (control_messages_1_1) {
                control_messages_1 = control_messages_1_1;
            },
            function (myprofile_service_1_1) {
                myprofile_service_1 = myprofile_service_1_1;
            },
            function (myprofile_1_1) {
                myprofile_1 = myprofile_1_1;
            }],
        execute: function() {
            MyProfileComponent = (function () {
                function MyProfileComponent(_myProfileService, formBuilder, _notificationService) {
                    this._myProfileService = _myProfileService;
                    this.formBuilder = formBuilder;
                    this._notificationService = _notificationService;
                    this.isDataAvailable = false;
                    this.isPermissionOkay = true;
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
                        .subscribe(function (data) {
                        _this.myProfile = data;
                        _this.myProfileForm.controls.username.updateValue(data.username);
                        _this.myProfileForm.controls.email.updateValue(data.email);
                        _this.myProfileForm.controls.default_group_id.updateValue(data.defaultGroupId);
                        _this.isDataAvailable = true;
                    }, function (error) {
                        _this.isDataAvailable = false;
                        if (error.status === 403 && error.statusText === 'Forbidden') {
                            _this.isPermissionOkay = false;
                        }
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
                    myProfile.defaultGroupId = this.defaultGroupIdValue;
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', {});
                    this._myProfileService.save(myProfile)
                        .subscribe(function (data) {
                        _this._notificationService.success('İşlem Başarılı', 'Kullanıcı bilgileriniz güncellendi.', {});
                    }, function (error) {
                        console.log(error);
                    });
                };
                MyProfileComponent = __decorate([
                    core_1.Component({
                        selector: "myprofile",
                        templateUrl: "./app/myprofile/components/myprofile.html",
                        directives: [router_1.ROUTER_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, notifications_1.SimpleNotificationsComponent, loader_animation_1.LoaderAnimation, control_messages_1.ControlMessages, permission_denied_1.PermissionDenied],
                        providers: [myprofile_service_1.MyProfileService, notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [myprofile_service_1.MyProfileService, forms_1.FormBuilder, (typeof (_a = typeof notifications_1.NotificationsService !== 'undefined' && notifications_1.NotificationsService) === 'function' && _a) || Object])
                ], MyProfileComponent);
                return MyProfileComponent;
                var _a;
            }());
            exports_1("MyProfileComponent", MyProfileComponent);
        }
    }
});

//# sourceMappingURL=myprofile.component.js.map
