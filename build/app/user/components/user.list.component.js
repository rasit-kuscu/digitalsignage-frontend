System.register(["@angular/core", '@angular/common', '@angular/router', 'ng2-bootstrap/components/pagination', 'ng2-bs3-modal/ng2-bs3-modal', 'angular2-notifications', '../services/user.service', '../../common/services/shared.service'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, pagination_1, ng2_bs3_modal_1, angular2_notifications_1, user_service_1, shared_service_1;
    var UserListComponent;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            }],
        execute: function() {
            UserListComponent = (function () {
                function UserListComponent(activatedRoute, router, _userService, _notificationService, _sharedService) {
                    this.activatedRoute = activatedRoute;
                    this.router = router;
                    this._userService = _userService;
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
                UserListComponent.prototype.ngOnInit = function () {
                    this.page = this.activatedRoute.snapshot.params['page'];
                    if (typeof this.page === 'undefined') {
                        this.page = 1;
                        this.dataLoadCount = 2;
                    }
                    this.list(this.page);
                };
                UserListComponent.prototype.list = function (page) {
                    var _this = this;
                    this.isPaginationDisabled = true;
                    this.isTableAvailable = false;
                    this._userService.list(page)
                        .subscribe(function (response) {
                        if (response.status === 'success') {
                            _this.itemsPerPage = _this._userService.itemsPerPage;
                            _this.totalItems = response.data.totalPage * _this.itemsPerPage;
                            _this.currentPage = response.data.currentPage;
                            _this.users = response.data.content;
                            _this.dataLoadCount++;
                            _this.isTableAvailable = true;
                            _this.isPaginationDisabled = false;
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                UserListComponent.prototype.pageChanged = function (event) {
                    if (this.dataLoadCount > 1) {
                        this.list(event.page);
                    }
                    this.dataLoadCount++;
                };
                UserListComponent.prototype.openUserDeleteModal = function (user) {
                    this.deletingUser = user;
                    this.userDeleteModal.open();
                };
                UserListComponent.prototype.delete = function () {
                    var _this = this;
                    this.isDeleting = true;
                    this._userService.delete(this.deletingUser.id)
                        .subscribe(function (response) {
                        _this.isDeleting = false;
                        if (response.status === 'success') {
                            _this.userDeleteModal.close();
                            _this.list(_this.page);
                            _this._notificationService.success('İşlem Başarılı', 'Kullanıcı başarıyla silindi.', {});
                        }
                        else {
                            _this.router.navigate(['/error', { status: response.status, message: encodeURIComponent(response.message) }]);
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                UserListComponent.prototype.onClose = function () {
                    this.deletingUser = null;
                };
                __decorate([
                    core_1.ViewChild('userDeleteModal'), 
                    __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
                ], UserListComponent.prototype, "userDeleteModal", void 0);
                UserListComponent = __decorate([
                    core_1.Component({
                        selector: "user-list",
                        templateUrl: "./app/user/components/user.list.html",
                        styleUrls: ['./app/user/components/user.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, pagination_1.PAGINATION_DIRECTIVES, common_1.CORE_DIRECTIVES, ng2_bs3_modal_1.MODAL_DIRECTIVES, angular2_notifications_1.SimpleNotificationsComponent],
                        providers: [user_service_1.UserService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, user_service_1.UserService, angular2_notifications_1.NotificationsService, shared_service_1.SharedService])
                ], UserListComponent);
                return UserListComponent;
            }());
            exports_1("UserListComponent", UserListComponent);
        }
    }
});

//# sourceMappingURL=user.list.component.js.map
