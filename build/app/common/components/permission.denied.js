System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var PermissionDenied;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PermissionDenied = (function () {
                function PermissionDenied() {
                }
                PermissionDenied = __decorate([
                    core_1.Component({
                        selector: 'permission-denied',
                        template: "<div class=\"alert alert-danger\" role=\"alert\">\n    <b>Yetki Gerekli !</b> Bu sayfay\u0131 g\u00F6r\u00FCnt\u00FCleme yetkiniz bulunmamaktad\u0131r.\n    Bunun bir hata oldu\u011Funu d\u00FC\u015F\u00FCn\u00FCyorsan\u0131z l\u00FCtfen sistem y\u00F6neticisi ile irtibat kurunuz.\n  </div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], PermissionDenied);
                return PermissionDenied;
            }());
            exports_1("PermissionDenied", PermissionDenied);
        }
    }
});

//# sourceMappingURL=permission.denied.js.map
