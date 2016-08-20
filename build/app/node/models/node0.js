System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Node;
    return {
        setters:[],
        execute: function() {
            Node = (function () {
                function Node(id, name, children, items) {
                    this.id = id;
                    this.name = name;
                    this.children = children;
                    this.items = items;
                    this.expanded = true;
                    this.checked = false;
                    this.nodes = [];
                    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                        var node = children_1[_i];
                        this.nodes.push(new Node(node['id'], node['name'], node['children'], null));
                    }
                }
                Node.prototype.toggle = function () {
                    this.expanded = !this.expanded;
                };
                Node.prototype.getIcon = function () {
                    if (this.expanded) {
                        return '-';
                    }
                    return '+';
                };
                Node.prototype.check = function () {
                    this.checked = !this.checked;
                    this.checkRecursive(this.checked);
                };
                Node.prototype.checkRecursive = function (state) {
                    this.nodes.forEach(function (d) {
                        d.checked = state;
                        d.checkRecursive(state);
                    });
                };
                return Node;
            }());
            exports_1("Node", Node);
        }
    }
});

//# sourceMappingURL=node0.js.map
