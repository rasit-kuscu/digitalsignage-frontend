System.register(['@angular/core', 'angular2-jwt', '../../common/headers', '../../common/services/shared.service', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, angular2_jwt_1, headers_1, shared_service_1;
    var GroupService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            GroupService = (function () {
                function GroupService(authHttp, _sharedService) {
                    this.authHttp = authHttp;
                    this._sharedService = _sharedService;
                    this.itemsPerPage = _sharedService.itemsPerPage;
                }
                GroupService.prototype.detail = function (groupId) {
                    return this.authHttp.get(this._sharedService.apiUrl + 'group/detail/' + groupId)
                        .map(function (response) { return response.json(); });
                };
                GroupService.prototype.load = function () {
                    return this.authHttp.get(this._sharedService.apiUrl + 'group/load')
                        .map(function (data) { return data.json(); });
                };
                GroupService.prototype.list = function (page) {
                    return this.authHttp.get(this._sharedService.apiUrl + 'group/list/' + this.itemsPerPage + '/' + page)
                        .map(function (response) { return response.json(); });
                };
                GroupService.prototype.delete = function (groupId) {
                    return this.authHttp.delete(this._sharedService.apiUrl + 'group/delete/' + groupId)
                        .map(function (data) { return data.json(); });
                };
                GroupService.prototype.save = function (group) {
                    return this.authHttp.post(this._sharedService.apiUrl + 'group/create', JSON.stringify(group), { headers: headers_1.contentHeaders })
                        .map(function (response) { return response.json(); });
                };
                GroupService.prototype.update = function (group) {
                    return this.authHttp.put(this._sharedService.apiUrl + 'group/update', JSON.stringify(group), { headers: headers_1.contentHeaders })
                        .map(function (response) { return response.json(); });
                };
                GroupService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, shared_service_1.SharedService])
                ], GroupService);
                return GroupService;
            }());
            exports_1("GroupService", GroupService);
        }
    }
});

//# sourceMappingURL=group.service.js.map
