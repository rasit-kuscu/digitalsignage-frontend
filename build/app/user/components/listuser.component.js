System.register(["@angular/core", '@angular/common', '@angular/router', '../services/user.service', 'ng2-bootstrap/components/pagination'], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, user_service_1, pagination_1;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (pagination_1_1) {
                pagination_1 = pagination_1_1;
            }],
        execute: function() {
            UserListComponent = (function () {
                function UserListComponent(activatedRoute, router, _userService) {
                    this.activatedRoute = activatedRoute;
                    this.router = router;
                    this._userService = _userService;
                    this.maxSize = 5;
                    this.isDataAvailable = false;
                    this.previousText = "Önceki";
                    this.nextText = "Sonraki";
                    this.firstText = "İlk";
                    this.lastText = "Son";
                    /*
                    * workaround for calling pageChanged event twice
                    * lame but works
                    */
                    this.dataLoadCount = 0;
                }
                UserListComponent.prototype.ngOnInit = function () {
                    var parentActivatedRoute = this.router.routerState.parent(this.activatedRoute);
                    this.pageSub = parentActivatedRoute.params.map(function (routeParams) { return page; });
                    this.page = this.pageSub.source.value.page;
                    if (typeof this.page === 'undefined') {
                        this.page = 1;
                    }
                    this.list(this.page);
                };
                UserListComponent.prototype.list = function (page) {
                    var _this = this;
                    this._userService.list(page)
                        .subscribe(function (response) {
                        if (response.status === 'success') {
                            _this.itemsPerPage = _this._userService.itemsPerPage;
                            _this.totalItems = response.data.totalPage * _this.itemsPerPage;
                            _this.currentPage = response.data.currentPage;
                            _this.users = response.data.users;
                            _this.dataLoadCount++;
                            _this.isDataAvailable = true;
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error.statusText) }]);
                    });
                };
                UserListComponent.prototype.pageChanged = function (event) {
                    if (this.dataLoadCount > 1) {
                        this.isDataAvailable = false;
                        this.list(event.page);
                    }
                    this.dataLoadCount++;
                };
                UserListComponent = __decorate([
                    core_1.Component({
                        selector: "user-main",
                        templateUrl: "./app/user/components/listuser.html",
                        styleUrls: ['./app/user/components/user.css'],
                        directives: [router_1.ROUTER_DIRECTIVES, pagination_1.PAGINATION_DIRECTIVES, common_1.CORE_DIRECTIVES],
                        providers: [user_service_1.UserService]
                    }), 
                    __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, user_service_1.UserService])
                ], UserListComponent);
                return UserListComponent;
            }());
            exports_1("UserListComponent", UserListComponent);
        }
    }
});

//# sourceMappingURL=listuser.component.js.map
