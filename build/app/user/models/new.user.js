System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NewUser;
    return {
        setters:[],
        execute: function() {
            NewUser = (function () {
                function NewUser(username, email, password, groups, roles) {
                    this.username = username;
                    this.email = email;
                    this.password = password;
                    this.groups = groups;
                    this.roles = roles;
                }
                return NewUser;
            }());
            exports_1("NewUser", NewUser);
        }
    }
});

//# sourceMappingURL=new.user.js.map
