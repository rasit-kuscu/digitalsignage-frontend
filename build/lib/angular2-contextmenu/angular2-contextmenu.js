"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var contextMenu_component_1 = require('./src/contextMenu.component');
__export(require('./src/contextMenu.component'));
__export(require('./src/contextMenu.service'));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    directives: [
        contextMenu_component_1.ContextMenuComponent,
    ],
};
