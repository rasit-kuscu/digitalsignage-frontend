System.register(['@angular/core', '@angular/common', 'angular2-modal'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, angular2_modal_1;
    var InAppModalContext, InAppModalContextBuilder, Modal, InAppModalBackdrop, dropInFactory, IN_APP_MODAL_PROVIDERS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (angular2_modal_1_1) {
                angular2_modal_1 = angular2_modal_1_1;
            }],
        execute: function() {
            /** FILE: modal-context.ts **/
            InAppModalContext = (function (_super) {
                __extends(InAppModalContext, _super);
                function InAppModalContext() {
                    _super.apply(this, arguments);
                }
                InAppModalContext.prototype.normalize = function () {
                    if (!this.message) {
                        this.message = '';
                    }
                };
                return InAppModalContext;
            }(angular2_modal_1.ModalOpenContext));
            exports_1("InAppModalContext", InAppModalContext);
            InAppModalContextBuilder = (function (_super) {
                __extends(InAppModalContextBuilder, _super);
                function InAppModalContextBuilder(modal) {
                    _super.call(this, { modal: modal }, ['title', 'templateRef'], InAppModalContext);
                }
                return InAppModalContextBuilder;
            }(angular2_modal_1.ModalOpenContextBuilder));
            exports_1("InAppModalContextBuilder", InAppModalContextBuilder);
            exports_1("Modal", Modal = angular2_modal_1.Modal);
            /** FILE: modal-backdrop.ts **/
            InAppModalBackdrop = (function () {
                function InAppModalBackdrop(dialog) {
                    this.dialog = dialog;
                }
                InAppModalBackdrop = __decorate([
                    core_1.Component({
                        selector: 'modal-backdrop',
                        directives: [common_1.NgTemplateOutlet],
                        styles: ["\n.in-app-modal-backdrop {\n\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n}", "\narticle {\n    margin: auto;\n    width: 600px;\n    background: inherit;\n    border: 1px solid rgba(0, 0, 0, 0.1);\n    border-radius: 6px;\n    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);\n    overflow: hidden;\n}\narticle:before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: inherit;\n    -webkit-filter: blur(10px) saturate(2);\n    filter: blur(10px) saturate(2);\n}\narticle .title {\n    padding: 8px;\n    background: rgba(235, 235, 235, 0.85);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n    font-size:24px;\n    text-align: center;\n}\narticle .content {\n    padding: 8px;\n    background: rgba(255, 255, 255, 0.66);\n}"
                        ],
                        template: "<div class=\"in-app-modal-backdrop\">\n    <article>\n        <div class=\"title\">\n            <span>{{dialog.context.title}}</span>\n        </div>\n        <div class=\"content\">\n            <template [ngTemplateOutlet]=\"dialog.context.templateRef\"></template>\n        </div>\n    </article>\n</div>"
                    }), 
                    __metadata('design:paramtypes', [angular2_modal_1.DialogRef])
                ], InAppModalBackdrop);
                return InAppModalBackdrop;
            }());
            exports_1("InAppModalBackdrop", InAppModalBackdrop);
            /** FILE: index.ts **/
            dropInFactory = {
                alert: function (modal) { return new InAppModalContextBuilder(modal); },
                prompt: undefined,
                confirm: undefined
            };
            exports_1("IN_APP_MODAL_PROVIDERS", IN_APP_MODAL_PROVIDERS = angular2_modal_1.MODAL_PROVIDERS.concat([
                { provide: Modal, useClass: Modal },
                { provide: angular2_modal_1.ModalBackdropComponent, useValue: InAppModalBackdrop },
                { provide: angular2_modal_1.ModalDropInFactory, useValue: dropInFactory }
            ]));
        }
    }
});

//# sourceMappingURL=custom.modal.component.js.map
