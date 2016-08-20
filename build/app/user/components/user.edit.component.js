System.register(["@angular/core", '@angular/router', '@angular/forms', 'angular2-notifications', '../../common/services/validation.service', '../../common/components/loader.animation', '../../common/components/control.messages', '../services/user.service', '../models/user', '../../group/services/group.service', '../../role/services/role.service', 'rxjs/add/operator/map', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1, angular2_notifications_1, validation_service_1, loader_animation_1, control_messages_1, user_service_1, user_1, group_service_1, role_service_1, Observable_1;
    var UserEditComponent;
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
            UserEditComponent = (function () {
                function UserEditComponent(_userService, _groupService, _roleService, formBuilder, _notificationService, router, activatedRoute) {
                    this._userService = _userService;
                    this._groupService = _groupService;
                    this._roleService = _roleService;
                    this.formBuilder = formBuilder;
                    this._notificationService = _notificationService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.isSaving = false;
                    this.isDataAvailable = false;
                    this.formGroupArr = [];
                    this.formRoleArr = [];
                }
                UserEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.userId = this.activatedRoute.snapshot.params['id'];
                    Observable_1.Observable.forkJoin(this._userService.detail(this.userId), this._groupService.load(), this._roleService.load()).subscribe(function (response) {
                        if (response[0].status === 'success' && response[1].status === 'success' && response[2].status === 'success') {
                            _this.user = response[0].data;
                            _this.accountNonLocked = _this.user['accountNonLocked'];
                            _this.groupList = response[1].data;
                            _this.roleList = response[2].data;
                            _this.populateCheckBoxes();
                            _this.prepareForm();
                            _this.isDataAvailable = true;
                        }
                        else {
                            _this.router.navigate(['/error', { status: response[0].status, message: encodeURIComponent(response[0].message) }]);
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                UserEditComponent.prototype.prepareForm = function () {
                    this.editUserForm = this.formBuilder.group({
                        'username': [this.user['username'], forms_1.Validators.required],
                        'email': [this.user['email'], [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
                        'account_non_locked': [this.user['accountNonLocked'], forms_1.Validators.required],
                        'groups': this.formBuilder.group(this.formGroupArr, { validator: validation_service_1.ValidationService.checkboxGroupValidator }),
                        'roles': this.formBuilder.group(this.formRoleArr, { validator: validation_service_1.ValidationService.checkboxGroupValidator }),
                        'passwords': this.formBuilder.group({
                            'password': ['', validation_service_1.ValidationService.passwordValidatorChange],
                            're_password': ['']
                        }, { validator: validation_service_1.ValidationService.passwordMatch })
                    });
                };
                UserEditComponent.prototype.populateCheckBoxes = function () {
                    for (var _i = 0, _a = this.groupList; _i < _a.length; _i++) {
                        var group = _a[_i];
                        var index = this.user['groups'].map(function (x) { return x.id; }).indexOf(group.id);
                        if (index >= 0) {
                            group.isChecked = true;
                        }
                        else {
                            group.isChecked = false;
                        }
                        this.formGroupArr[group.id] = new forms_1.FormControl(true);
                    }
                    for (var _b = 0, _c = this.roleList; _b < _c.length; _b++) {
                        var role = _c[_b];
                        var index = this.user['roles'].map(function (x) { return x.id; }).indexOf(role.id);
                        if (index >= 0) {
                            role.isChecked = true;
                        }
                        else {
                            role.isChecked = false;
                        }
                        this.formRoleArr[role.id] = new forms_1.FormControl(true);
                    }
                };
                UserEditComponent.prototype.updateCheckedOptions = function (option, event) {
                    if (option.isChecked) {
                        option.isChecked = false;
                    }
                    else {
                        option.isChecked = true;
                    }
                };
                UserEditComponent.prototype.save = function () {
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
                    if (this.accountNonLocked) {
                        this.user['loginAttempt'] = null;
                    }
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this.isSaving = true;
                    this._userService.update(new user_1.User(this.userId, this.editUserForm.value.username, this.editUserForm.value.email, this.editUserForm.value.passwords.password, groups, roles, this.accountNonLocked))
                        .subscribe(function (response) {
                        _this.isSaving = false;
                        if (response.status === 'success') {
                            _this._notificationService.success('İşlem Başarılı', 'Kullanıcı bilgileri güncellendi.', {});
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
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                UserEditComponent.prototype.defaultStatusSelector = function (value) {
                    this.accountNonLocked = value;
                };
                UserEditComponent = __decorate([
                    core_1.Component({
                        selector: "user-edit",
                        templateUrl: "./app/user/components/user.edit.html",
                        directives: [router_1.ROUTER_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, angular2_notifications_1.SimpleNotificationsComponent, control_messages_1.ControlMessages, loader_animation_1.LoaderAnimation],
                        providers: [user_service_1.UserService, group_service_1.GroupService, role_service_1.RoleService, angular2_notifications_1.NotificationsService],
                        styleUrls: ['./app/user/components/user.css'],
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, group_service_1.GroupService, role_service_1.RoleService, forms_1.FormBuilder, angular2_notifications_1.NotificationsService, router_1.Router, router_1.ActivatedRoute])
                ], UserEditComponent);
                return UserEditComponent;
            }());
            exports_1("UserEditComponent", UserEditComponent);
        }
    }
});

//# sourceMappingURL=user.edit.component.js.map
