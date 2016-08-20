System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NodeConst;
    return {
        setters:[],
        execute: function() {
            NodeConst = (function () {
                function NodeConst(id, name, type, parentNode, lastUpdate) {
                    this.id = id;
                    this.name = name;
                    this.type = type;
                    this.parentNode = parentNode;
                    this.lastUpdate = lastUpdate;
                }
                return NodeConst;
            }());
            exports_1("NodeConst", NodeConst);
        }
    }
});

//# sourceMappingURL=node.const.js.map
