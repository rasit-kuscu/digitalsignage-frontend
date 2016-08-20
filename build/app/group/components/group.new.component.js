System.register(["@angular/core", '@angular/router', '@angular/forms', 'angular2-notifications', '../../common/components/loader.animation', '../../common/components/control.messages', '../../group/models/group', '../../group/services/group.service', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1, angular2_notifications_1, loader_animation_1, control_messages_1, group_1, group_service_1;
    var GroupNewComponent;
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
            function (_1) {}],
        execute: function() {
            GroupNewComponent = (function () {
                function GroupNewComponent(_groupService, formBuilder, _notificationService, router, activatedRoute) {
                    this._groupService = _groupService;
                    this.formBuilder = formBuilder;
                    this._notificationService = _notificationService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.isSaving = false;
                }
                GroupNewComponent.prototype.ngOnInit = function () {
                    this.newGroupForm = this.formBuilder.group({
                        'name': ['', forms_1.Validators.required]
                    });
                };
                GroupNewComponent.prototype.save = function () {
                    var _this = this;
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this.isSaving = true;
                    this._groupService.save(new group_1.Group(0, this.newGroupForm.value.name))
                        .subscribe(function (response) {
                        _this.isSaving = false;
                        if (response.status === 'success') {
                            _this._notificationService.success('İşlem Başarılı', 'Grup oluşturuldu.', {});
                            _this.router.navigate(['/management', 'group']);
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
                GroupNewComponent = __decorate([
                    core_1.Component({
                        selector: "group-new",
                        templateUrl: "./app/group/components/group.new.html",
                        directives: [router_1.ROUTER_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, angular2_notifications_1.SimpleNotificationsComponent, control_messages_1.ControlMessages, loader_animation_1.LoaderAnimation],
                        providers: [group_service_1.GroupService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [group_service_1.GroupService, forms_1.FormBuilder, angular2_notifications_1.NotificationsService, router_1.Router, router_1.ActivatedRoute])
                ], GroupNewComponent);
                return GroupNewComponent;
            }());
            exports_1("GroupNewComponent", GroupNewComponent);
        }
    }
});

//# sourceMappingURL=group.new.component.js.map
