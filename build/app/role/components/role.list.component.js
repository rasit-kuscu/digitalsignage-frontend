System.register(["@angular/core", '@angular/common', '@angular/router', 'ng2-bootstrap/components/pagination', 'ng2-bs3-modal/ng2-bs3-modal', 'angular2-notifications', '../services/role.service', '../../common/services/shared.service'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, pagination_1, ng2_bs3_modal_1, angular2_notifications_1, role_service_1, shared_service_1;
    var RoleListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (pagination_1_1) {
                pagination_1 = pagination_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (role_service_1_1) {
                role_service_1 = role_service_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            }],
        execute: function() {
            RoleListComponent = (function () {
                function RoleListComponent(activatedRoute, router, _roleService, _notificationService, _sharedService) {
                    this.activatedRoute = activatedRoute;
                    this.router = router;
                    this._roleService = _roleService;
                    this._notificationService = _notificationService;
                    this._sharedService = _sharedService;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.isDeleting = false;
                    this.maxSize = 5;
                    this.previousText = "Önceki";
                    this.nextText = "Sonraki";
                    this.firstText = "İlk";
                    this.lastText = "Son";
                    this.isPaginationDisabled = true;
                    this.isTableAvailable = false;
                    /*
                    * workaround for calling pageChanged event twice
                    * lame but works
                    */
                    this.dataLoadCount = 0;
                    this.modalDisableClose = 'static';
                }
                RoleListComponent.prototype.ngOnInit = function () {
                    this.page = this.activatedRoute.snapshot.params['page'];
                    if (typeof this.page === 'undefined') {
                        this.page = 1;
                        this.dataLoadCount = 2;
                    }
                    this.list(this.page);
                };
                RoleListComponent.prototype.list = function (page) {
                    var _this = this;
                    this.isPaginationDisabled = true;
                    this.isTableAvailable = false;
                    this._roleService.list(page)
                        .subscribe(function (response) {
                        if (response.status === 'success') {
                            _this.itemsPerPage = _this._roleService.itemsPerPage;
                            _this.totalItems = response.data.totalPage * _this.itemsPerPage;
                            _this.currentPage = response.data.currentPage;
                            _this.roles = response.data.content;
                            _this.dataLoadCount++;
                            _this.isTableAvailable = true;
                            _this.isPaginationDisabled = false;
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                RoleListComponent.prototype.pageChanged = function (event) {
                    if (this.dataLoadCount > 1) {
                        this.list(event.page);
                    }
                    this.dataLoadCount++;
                };
                RoleListComponent.prototype.openRoleDeleteModal = function (role) {
                    this.deletingRole = role;
                    this.roleDeleteModal.open();
                };
                RoleListComponent.prototype.delete = function () {
                    var _this = this;
                    this.isDeleting = true;
                    this._roleService.delete(this.deletingRole.id)
                        .subscribe(function (response) {
                        _this.isDeleting = false;
                        if (response.status === 'success') {
                            _this.roleDeleteModal.close();
                            _this.list(_this.page);
                            _this._notificationService.success('İşlem Başarılı', 'Yetki başarıyla silindi.', {});
                        }
                        else {
                            _this.router.navigate(['/error', { status: response.status, message: encodeURIComponent(response.message) }]);
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error.statusText) }]);
                    });
                };
                RoleListComponent.prototype.onClose = function () {
                    this.deletingRole = null;
                };
                __decorate([
                    core_1.ViewChild('roleDeleteModal'), 
                    __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
                ], RoleListComponent.prototype, "roleDeleteModal", void 0);
                RoleListComponent = __decorate([
                    core_1.Component({
                        selector: "role-main",
                        templateUrl: "./app/role/components/role.list.html",
                        directives: [router_1.ROUTER_DIRECTIVES, pagination_1.PAGINATION_DIRECTIVES, common_1.CORE_DIRECTIVES, ng2_bs3_modal_1.MODAL_DIRECTIVES, angular2_notifications_1.SimpleNotificationsComponent],
                        providers: [role_service_1.RoleService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, role_service_1.RoleService, angular2_notifications_1.NotificationsService, shared_service_1.SharedService])
                ], RoleListComponent);
                return RoleListComponent;
            }());
            exports_1("RoleListComponent", RoleListComponent);
        }
    }
});

//# sourceMappingURL=role.list.component.js.map
