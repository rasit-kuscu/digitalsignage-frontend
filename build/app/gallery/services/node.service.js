System.register(['@angular/core', 'angular2-jwt', '../../common/services/shared.service', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, angular2_jwt_1, shared_service_1;
    var NodeService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            NodeService = (function () {
                function NodeService(authHttp, _sharedService) {
                    this.authHttp = authHttp;
                    this._sharedService = _sharedService;
                    this.itemsPerPage = _sharedService.itemsPerPage;
                }
                NodeService.prototype.load = function () {
                    return this.authHttp.get(this._sharedService.apiUrl + 'node/load/23')
                        .map(function (response) { return response.json(); });
                };
                NodeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, shared_service_1.SharedService])
                ], NodeService);
                return NodeService;
            }());
            exports_1("NodeService", NodeService);
        }
    }
});

//# sourceMappingURL=node.service.js.map
