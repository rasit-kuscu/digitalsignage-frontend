System.register(['@angular/core', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var TreeView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            TreeView = (function () {
                function TreeView() {
                    this.onNotify = new core_1.EventEmitter();
                }
                TreeView.prototype.onClick = function (node) {
                    console.log(node);
                    this.onNotify.emit(node.id);
                    this.onNotifyChild(node.id);
                };
                TreeView.prototype.onNotifyChild = function (node) {
                    this.onNotify.emit(node.id);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], TreeView.prototype, "nodes", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], TreeView.prototype, "onNotify", void 0);
                TreeView = __decorate([
                    core_1.Component({
                        selector: 'tree-view',
                        templateUrl: './app/gallery/components/tree.view.html',
                        directives: [TreeView, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TreeView);
                return TreeView;
            }());
            exports_1("TreeView", TreeView);
        }
    }
});

//# sourceMappingURL=tree.view.js.map
