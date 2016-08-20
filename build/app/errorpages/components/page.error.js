System.register(["@angular/core", '@angular/router', '../../common/services/shared.service'], function(exports_1, context_1) {
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
    var core_1, router_1, shared_service_1;
    var PageError;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            }],
        execute: function() {
            PageError = (function () {
                function PageError(router, _sharedService, activatedRoute) {
                    this.router = router;
                    this._sharedService = _sharedService;
                    this.activatedRoute = activatedRoute;
                    this.needLogin = false;
                    this.needPermission = false;
                }
                PageError.prototype.ngOnInit = function () {
                    var ifJson = false;
                    this.message = decodeURIComponent(this.activatedRoute.snapshot.params['message']);
                    try {
                        this.message = JSON.parse(this.message);
                        ifJson = true;
                    }
                    catch (e) {
                        ifJson = false;
                    }
                    if (ifJson) {
                        if (this.message['error'] === 'Unauthorized' && this.message['message'] === 'Access Denied') {
                            this.needLogin = true;
                            localStorage.removeItem('id_token');
                        }
                        else if (this.message['error'] === 'Forbidden' && this.message['exception'] === 'org.springframework.security.access.AccessDeniedException') {
                            this.needPermission = true;
                        }
                    }
                };
                PageError = __decorate([
                    core_1.Component({
                        selector: "page-error",
                        templateUrl: "./app/errorpages/components/page.error.html",
                        styleUrls: ['./app/errorpages/components/error.css'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, shared_service_1.SharedService, router_1.ActivatedRoute])
                ], PageError);
                return PageError;
            }());
            exports_1("PageError", PageError);
        }
    }
});

//# sourceMappingURL=page.error.js.map
