System.register(["@angular/core", "@angular/router", 'angular2-jwt', 'ng2-bootstrap/ng2-bootstrap', './common/services/shared.service'], function(exports_1, context_1) {
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
    var core_1, router_1, angular2_jwt_1, ng2_bootstrap_1, shared_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router, authHttp, _sharedService) {
                    var _this = this;
                    this.router = router;
                    this.authHttp = authHttp;
                    this._sharedService = _sharedService;
                    this.isCollapsed = true;
                    this.isLogged = false;
                    this.jwtHelper = new angular2_jwt_1.JwtHelper();
                    this.isLogged = false;
                    router.events.subscribe(function (val) {
                        if (val instanceof router_1.NavigationStart) {
                            _this.jwt = localStorage.getItem('id_token');
                            if (_this.jwt != null) {
                                if (!_this.jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
                                    _this.isLogged = true;
                                }
                                else {
                                    _this.isLogged = false;
                                }
                            }
                            else {
                                _this.isLogged = false;
                            }
                        }
                        if (val instanceof router_1.NavigationEnd) {
                            if (val.url.substring(0, 6) === '/error') {
                                _this.isLogged = false;
                            }
                        }
                    });
                }
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem('id_token');
                    this.router.navigate(['/login']);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "app",
                        templateUrl: "./app/app.html",
                        directives: [router_1.ROUTER_DIRECTIVES, ng2_bootstrap_1.CollapseDirective, ng2_bootstrap_1.DROPDOWN_DIRECTIVES],
                        providers: [shared_service_1.SharedService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, angular2_jwt_1.AuthHttp, shared_service_1.SharedService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=app.component.js.map
