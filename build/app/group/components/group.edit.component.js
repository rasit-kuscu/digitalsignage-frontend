System.register(["@angular/core", '@angular/router', '@angular/forms', 'angular2-notifications', '../../common/components/loader.animation', '../../common/components/control.messages', '../../group/models/group', '../../group/services/group.service', 'rxjs/add/operator/map', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1, angular2_notifications_1, loader_animation_1, control_messages_1, group_1, group_service_1, Observable_1;
    var GroupEditComponent;
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
            function (loader_animation_1_1) {
                loader_animation_1 = loader_animation_1_1;
            },
            function (control_messages_1_1) {
                control_messages_1 = control_messages_1_1;
            },
            function (group_1_1) {
                group_1 = group_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            GroupEditComponent = (function () {
                function GroupEditComponent(_groupService, formBuilder, _notificationService, router, activatedRoute) {
                    this._groupService = _groupService;
                    this.formBuilder = formBuilder;
                    this._notificationService = _notificationService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.isDataAvailable = false;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.isSaving = false;
                }
                GroupEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.groupId = this.activatedRoute.snapshot.params['id'];
                    Observable_1.Observable.forkJoin(this._groupService.detail(this.groupId)).subscribe(function (response) {
                        if (response[0].status === 'success') {
                            _this.group = response[0].data;
                            _this.editGroupForm = _this.formBuilder.group({
                                'name': [_this.group['name'], forms_1.Validators.required]
                            });
                            _this.isDataAvailable = true;
                        }
                        else {
                            _this.router.navigate(['/error', { status: response[0].status, message: encodeURIComponent(response[0].message) }]);
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                GroupEditComponent.prototype.save = function () {
                    var _this = this;
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this.isSaving = true;
                    this._groupService.update(new group_1.Group(this.groupId, this.editGroupForm.value.name))
                        .subscribe(function (response) {
                        _this.isSaving = false;
                        if (response.status === 'success') {
                            _this._notificationService.success('İşlem Başarılı', 'Grup bilgileri güncellendi.', {});
                        }
                        else if (response.status === 'fail') {
                            if (response.message === 'group_name_taken') {
                                _this._notificationService.error('Hata', 'Girilen grup adı kayıtlı.', {});
                            }
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                GroupEditComponent = __decorate([
                    core_1.Component({
                        selector: "group-edit",
                        templateUrl: "./app/group/components/group.edit.html",
                        directives: [router_1.ROUTER_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, angular2_notifications_1.SimpleNotificationsComponent, control_messages_1.ControlMessages, loader_animation_1.LoaderAnimation],
                        providers: [group_service_1.GroupService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [group_service_1.GroupService, forms_1.FormBuilder, angular2_notifications_1.NotificationsService, router_1.Router, router_1.ActivatedRoute])
                ], GroupEditComponent);
                return GroupEditComponent;
            }());
            exports_1("GroupEditComponent", GroupEditComponent);
        }
    }
});

//# sourceMappingURL=group.edit.component.js.map
