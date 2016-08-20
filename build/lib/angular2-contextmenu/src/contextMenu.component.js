"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var contextMenu_service_1 = require('./contextMenu.service');
var ContextMenuComponent = (function () {
    function ContextMenuComponent(_contextMenuService) {
        var _this = this;
        this._contextMenuService = _contextMenuService;
        this.useBootstrap4 = false;
        this.close = new core_1.EventEmitter();
        this.links = [];
        this.isShown = false;
        this.isOpening = false;
        this.mouseLocation = { left: 0, top: 0 };
        _contextMenuService.show.subscribe(function (e) { return _this.showMenu(e.event, e.actions, e.item); });
    }
    Object.defineProperty(ContextMenuComponent.prototype, "locationCss", {
        get: function () {
            return {
                'position': 'fixed',
                'display': this.isShown ? 'block' : 'none',
                left: this.mouseLocation.left + 'px',
                top: this.mouseLocation.top + 'px',
            };
        },
        enumerable: true,
        configurable: true
    });
    ContextMenuComponent.prototype.clickedOutside = function () {
        if (!this.isOpening) {
            this.hideMenu();
        }
    };
    ContextMenuComponent.prototype.isDisabled = function (link) {
        return link.enabled && !link.enabled(this.item);
    };
    ContextMenuComponent.prototype.execute = function (link, $event) {
        if (this.isDisabled(link)) {
            return;
        }
        this.hideMenu();
        link.click(this.item, $event);
    };
    ContextMenuComponent.prototype.showMenu = function (event, actions, item) {
        var _this = this;
        this.isOpening = true;
        setTimeout(function () { return _this.isOpening = false; }, 400);
        if (actions && actions.length > 0) {
            this.isShown = true;
        }
        this.links = actions;
        this.item = item;
        this.mouseLocation = {
            left: event.clientX,
            top: event.clientY,
        };
    };
    ContextMenuComponent.prototype.hideMenu = function () {
        if (this.isShown === true) {
            this.close.emit({});
        }
        this.isShown = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ContextMenuComponent.prototype, "useBootstrap4", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ContextMenuComponent.prototype, "close", void 0);
    __decorate([
        core_1.HostListener('document:click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ContextMenuComponent.prototype, "clickedOutside", null);
    ContextMenuComponent = __decorate([
        core_1.Component({
            selector: 'context-menu',
            styles: [],
            template: "<div class=\"dropdown angular2-contextmenu\">\n      <ul [ngStyle]=\"locationCss\" class=\"dropdown-menu\">\n        <li *ngFor=\"let link of links\" [class.disabled]=\"isDisabled(link)\">\n          <a href [class.dropdown-item]=\"useBootstrap4\" [class.disabled]=\"useBootstrap4 && isDisabled(link)\" (click)=\"execute(link, $event); $event.preventDefault();\" innerHTML=\"{{link.html(item)}}\"></a>\n        </li>\n      </ul>\n    </div>\n  ",
        }), 
        __metadata('design:paramtypes', [contextMenu_service_1.ContextMenuService])
    ], ContextMenuComponent);
    return ContextMenuComponent;
}());
exports.ContextMenuComponent = ContextMenuComponent;
