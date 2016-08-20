System.register(["@angular/core", '@angular/router', 'angular2-notifications', '../../common/services/shared.service', '../../node/services/node.service'], function(exports_1, context_1) {
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
    var core_1, router_1, angular2_notifications_1, shared_service_1, node_service_1;
    var GalleryNewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            },
            function (node_service_1_1) {
                node_service_1 = node_service_1_1;
            }],
        execute: function() {
            GalleryNewComponent = (function () {
                function GalleryNewComponent(router, activatedRoute, _sharedService, _notificationService) {
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this._sharedService = _sharedService;
                    this._notificationService = _notificationService;
                    this.isDataAvailable = false;
                }
                GalleryNewComponent.prototype.ngOnInit = function () {
                    this.isDataAvailable = true;
                };
                GalleryNewComponent = __decorate([
                    core_1.Component({
                        selector: "gallery-new",
                        templateUrl: "./app/gallery/components/gallery.new.html",
                        styleUrls: ['./app/gallery/components/gallery.css'],
                        directives: [angular2_notifications_1.SimpleNotificationsComponent],
                        providers: [node_service_1.NodeService, angular2_notifications_1.NotificationsService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, shared_service_1.SharedService, angular2_notifications_1.NotificationsService])
                ], GalleryNewComponent);
                return GalleryNewComponent;
            }());
            exports_1("GalleryNewComponent", GalleryNewComponent);
        }
    }
});

//# sourceMappingURL=gallery.new.js.map
