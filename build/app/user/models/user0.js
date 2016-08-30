System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(id, username, email, password, groups, roles, accountNonLocked) {
                    this.id = id;
                    this.username = username;
                    this.email = email;
                    this.password = password;
                    this.groups = groups;
                    this.roles = roles;
                    this.accountNonLocked = accountNonLocked;
                }
                return User;
            }());
            exports_1("User", User);
        }
    }
});

//# sourceMappingURL=user0.js.map
