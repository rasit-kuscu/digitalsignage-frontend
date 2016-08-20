System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Group;
    return {
        setters:[],
        execute: function() {
            Group = (function () {
                function Group(id, name) {
                    this.isChecked = false;
                    this.id = id;
                    this.name = name;
                }
                return Group;
            }());
            exports_1("Group", Group);
        }
    }
});

//# sourceMappingURL=group.js.map
