System.register(["@angular/core", '@angular/router', '@angular/common', '@angular/forms', 'angular2-notifications', '../../common/services/shared.service', '../../node/services/node.service', 'ng2-file-upload/ng2-file-upload'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, forms_1, angular2_notifications_1, shared_service_1, node_service_1, ng2_file_upload_1;
    var URL, GalleryNewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            },
            function (node_service_1_1) {
                node_service_1 = node_service_1_1;
            },
            function (ng2_file_upload_1_1) {
                ng2_file_upload_1 = ng2_file_upload_1_1;
            }],
        execute: function() {
            URL = '';
            GalleryNewComponent = (function () {
                function GalleryNewComponent(router, activatedRoute, _sharedService, _notificationService) {
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this._sharedService = _sharedService;
                    this._notificationService = _notificationService;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.isDataAvailable = false;
                    this.hasBaseDropZoneOver = false;
                    this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
                }
                GalleryNewComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.isDataAvailable = true;
                    this.uploader['isHTML5'] = true;
                    this.uploader.onAfterAddingFile = (function (item) {
                        _this.uploadElRef.nativeElement.value = '';
                    });
                };
                GalleryNewComponent.prototype.fileOverBase = function (e) {
                    this.hasBaseDropZoneOver = e;
                };
                __decorate([
                    core_1.ViewChild('uploadEl'), 
                    __metadata('design:type', core_1.ElementRef)
                ], GalleryNewComponent.prototype, "uploadElRef", void 0);
                GalleryNewComponent = __decorate([
                    core_1.Component({
                        selector: "gallery-new",
                        templateUrl: "./app/gallery/components/gallery.new.html",
                        styleUrls: ['./app/gallery/components/gallery.css'],
                        directives: [angular2_notifications_1.SimpleNotificationsComponent, ng2_file_upload_1.FILE_UPLOAD_DIRECTIVES, common_1.NgClass, common_1.NgStyle, common_1.CORE_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES],
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

//# sourceMappingURL=gallery.new.component.js.map
