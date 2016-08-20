System.register(["@angular/core", '@angular/router', '@angular/forms', 'angular2-notifications', '../../common/services/validation.service', '../../common/components/loader.animation', '../../common/components/control.messages', '../../role/models/role', '../../role/services/role.service', '../../role/services/privilege.service', 'rxjs/add/operator/map', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1, angular2_notifications_1, validation_service_1, loader_animation_1, control_messages_1, role_1, role_service_1, privilege_service_1, Observable_1;
    var RoleNewComponent;
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
            function (role_1_1) {
                role_1 = role_1_1;
            },
            function (role_service_1_1) {
                role_service_1 = role_service_1_1;
            },
            function (privilege_service_1_1) {
                privilege_service_1 = privilege_service_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            RoleNewComponent = (function () {
                function RoleNewComponent(_roleService, _privilegeService, formBuilder, _notificationService, router, activatedRoute) {
                    this._roleService = _roleService;
                    this._privilegeService = _privilegeService;
                    this.formBuilder = formBuilder;
                    this._notificationService = _notificationService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.isSaving = false;
                    this.isDataAvailable = false;
                    this.formPrivilegeArr = [];
                }
                RoleNewComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    Observable_1.Observable.forkJoin(this._privilegeService.load()).subscribe(function (response) {
                        if (response[0].status === 'success') {
                            _this.privilegeList = response[0].data;
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
                RoleNewComponent.prototype.prepareForm = function () {
                    this.newRoleForm = this.formBuilder.group({
                        'name': ['', forms_1.Validators.required],
                        'privileges': this.formBuilder.group(this.formPrivilegeArr, { validator: validation_service_1.ValidationService.checkboxGroupValidator })
                    });
                };
                RoleNewComponent.prototype.populateCheckBoxes = function () {
                    for (var _i = 0, _a = this.privilegeList; _i < _a.length; _i++) {
                        var privilege = _a[_i];
                        this.formPrivilegeArr[privilege.id] = new forms_1.FormControl(false);
                    }
                };
                RoleNewComponent.prototype.updateCheckedOptions = function (option, event) {
                    if (option.isChecked) {
                        option.isChecked = false;
                    }
                    else {
                        option.isChecked = true;
                    }
                };
                RoleNewComponent.prototype.save = function () {
                    var _this = this;
                    var privileges = [];
                    for (var _i = 0, _a = this.privilegeList; _i < _a.length; _i++) {
                        var privilege = _a[_i];
                        if (privilege.isChecked) {
                            privileges.push(privilege.id);
                        }
                    }
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this.isSaving = true;
                    this._roleService.save(new role_1.Role(0, this.newRoleForm.value.name, privileges))
                        .subscribe(function (response) {
                        _this.isSaving = false;
                        if (response.status === 'success') {
                            _this._notificationService.success('İşlem Başarılı', 'Yetki oluşturuldu.', {});
                            _this.router.navigate(['/management', 'role']);
                        }
                        else if (response.status === 'fail') {
                            if (response.message === 'role_name_taken') {
                                _this._notificationService.error('Hata', 'Girilen yetki adı kayıtlı.', {});
                            }
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                RoleNewComponent = __decorate([
                    core_1.Component({
                        selector: "role-new",
                        templateUrl: "./app/role/components/role.new.html",
                        directives: [router_1.ROUTER_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, angular2_notifications_1.SimpleNotificationsComponent, control_messages_1.ControlMessages, loader_animation_1.LoaderAnimation],
                        providers: [role_service_1.RoleService, privilege_service_1.PrivilegeService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [role_service_1.RoleService, privilege_service_1.PrivilegeService, forms_1.FormBuilder, angular2_notifications_1.NotificationsService, router_1.Router, router_1.ActivatedRoute])
                ], RoleNewComponent);
                return RoleNewComponent;
            }());
            exports_1("RoleNewComponent", RoleNewComponent);
        }
    }
});

//# sourceMappingURL=role.new.component.js.map
