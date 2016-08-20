System.register(["@angular/core", '@angular/router', '@angular/forms', 'notifications', '../../common/services/validation.service', '../../common/components/loader.animation', '../../common/components/permission.denied', '../../common/components/control.messages', '../services/user.service', '../models/user', '../../group/services/group.service', '../../role/services/role.service', 'rxjs/add/operator/map', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1, notifications_1, validation_service_1, loader_animation_1, permission_denied_1, control_messages_1, user_service_1, user_1, group_service_1, role_service_1, Observable_1;
    var NewUserComponent;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (role_service_1_1) {
                role_service_1 = role_service_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            NewUserComponent = (function () {
                function NewUserComponent(_userService, _groupService, _roleService, formBuilder, _notificationService, router) {
                    this._userService = _userService;
                    this._groupService = _groupService;
                    this._roleService = _roleService;
                    this.formBuilder = formBuilder;
                    this._notificationService = _notificationService;
                    this.router = router;
                    this.isSaving = false;
                    this.isDataAvailable = false;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.formGroupArr = [];
                    this.formRoleArr = [];
                }
                NewUserComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    Observable_1.Observable.forkJoin(this._groupService.load(), this._roleService.load()).subscribe(function (data) {
                        if (data[0].status === 'success' && data[1].status === 'success') {
                            _this.groupList = data[0].data;
                            _this.roleList = data[1].data;
                            _this.populateCheckBoxes();
                            _this.prepareForm();
                            _this.isDataAvailable = true;
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error.statusText) }]);
                    });
                };
                NewUserComponent.prototype.prepareForm = function () {
                    this.newUserForm = this.formBuilder.group({
                        'username': ['', forms_1.Validators.required],
                        'email': ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
                        'groups': this.formBuilder.group(this.formGroupArr, { validator: validation_service_1.ValidationService.checkboxGroupValidator }),
                        'roles': this.formBuilder.group(this.formRoleArr, { validator: validation_service_1.ValidationService.checkboxGroupValidator }),
                        'passwords': this.formBuilder.group({
                            'password': ['', [forms_1.Validators.required, validation_service_1.ValidationService.passwordValidatorChange]],
                            're_password': ['', forms_1.Validators.required]
                        }, { validator: validation_service_1.ValidationService.passwordMatch })
                    });
                };
                NewUserComponent.prototype.populateCheckBoxes = function () {
                    for (var _i = 0, _a = this.groupList; _i < _a.length; _i++) {
                        var group = _a[_i];
                        group.isChecked = false;
                        this.formGroupArr[group.id] = new forms_1.FormControl('');
                    }
                    for (var _b = 0, _c = this.roleList; _b < _c.length; _b++) {
                        var role = _c[_b];
                        role.isChecked = false;
                        this.formRoleArr[role.id] = new forms_1.FormControl('');
                    }
                };
                NewUserComponent.prototype.updateCheckedOptions = function (option, event) {
                    if (option.isChecked) {
                        option.isChecked = false;
                    }
                    else {
                        option.isChecked = true;
                    }
                };
                NewUserComponent.prototype.save = function () {
                    var _this = this;
                    var groups = [];
                    var roles = [];
                    for (var _i = 0, _a = this.groupList; _i < _a.length; _i++) {
                        var group = _a[_i];
                        if (group.isChecked) {
                            groups.push(group.id);
                        }
                    }
                    for (var _b = 0, _c = this.roleList; _b < _c.length; _b++) {
                        var role = _c[_b];
                        if (role.isChecked) {
                            roles.push(role.id);
                        }
                    }
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this.isSaving = true;
                    this._userService.save(new user_1.User(null, this.newUserForm.value.username, this.newUserForm.value.email, this.newUserForm.value.passwords.password, groups, roles))
                        .subscribe(function (response) {
                        _this.isSaving = false;
                        if (response.status === 'success') {
                            _this.isSaving = true;
                            _this._notificationService.success('İşlem Başarılı', 'Kullanıcı başarıyla yaratıldı. Yönlendiriliyorsunuz.', {});
                        }
                        else if (response.status === 'fail') {
                            if (response.message === 'user_username_exists') {
                                _this._notificationService.error('Hata', 'Girilen kullanıcı adı kayıtlı.', {});
                            }
                            else if (response.message === 'user_email_exists') {
                                _this._notificationService.error('Hata', 'Girilen email adresi zaten kayıtlı.', {});
                            }
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error.statusText) }]);
                    });
                };
                NewUserComponent = __decorate([
                    core_1.Component({
                        selector: "newuser",
                        templateUrl: "./app/user/components/newuser.html",
                        directives: [router_1.ROUTER_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, notifications_1.SimpleNotificationsComponent, loader_animation_1.LoaderAnimation, control_messages_1.ControlMessages, permission_denied_1.PermissionDenied],
                        providers: [user_service_1.UserService, group_service_1.GroupService, role_service_1.RoleService, notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, group_service_1.GroupService, role_service_1.RoleService, forms_1.FormBuilder, (typeof (_a = typeof notifications_1.NotificationsService !== 'undefined' && notifications_1.NotificationsService) === 'function' && _a) || Object, router_1.Router])
                ], NewUserComponent);
                return NewUserComponent;
                var _a;
            }());
            exports_1("NewUserComponent", NewUserComponent);
        }
    }
});

//# sourceMappingURL=newuser.component.js.map
