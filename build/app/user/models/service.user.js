System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ServiceUser;
    return {
        setters:[],
        execute: function() {
            ServiceUser = (function () {
                function ServiceUser(username, password, enabled) {
                    this.username = username;
                    this.password = password;
                    this.enabled = enabled;
                }
                return ServiceUser;
            }());
            exports_1("ServiceUser", ServiceUser);
        }
    }
});

//# sourceMappingURL=service.user.js.map
