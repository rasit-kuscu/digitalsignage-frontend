System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role;
    return {
        setters:[],
        execute: function() {
            Role = (function () {
                function Role(id, name, privileges) {
                    this.isChecked = false;
                    this.id = id;
                    this.name = name;
                    this.privileges = privileges;
                }
                return Role;
            }());
            exports_1("Role", Role);
        }
    }
});

//# sourceMappingURL=role.js.map
