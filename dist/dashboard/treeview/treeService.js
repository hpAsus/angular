"use strict";
// Tree View Service
// =====================================================================================================================

(function () {

    // Tree
    // =====================================================================================================================
    function Tree(title) {
        this.version = '0';
        this.id = generateID();
        this.metadata = {
            'title': title
        };
        this.rootNode = null;

        // Generate uniq ID Helper Method
        // =============================================================================
        function generateID() {
            var d = new Date().getTime();
            var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
            });
            return id;
        }
    }

    // NODE ENTITY
    // =============================================================================
    function NODE(title) {
        this.id = '1';
        this.metadata = {
            'title': title
        };
        this._parent = null;
        this._children = [];
    }

    // Set parent Method
    // =============================================================================
    Node.prototype.setParent = function (node) {
        this._parent = node;
    };

    // Get parent Method
    // =============================================================================
    Node.prototype.getParent = function () {
        return this._parent;
    };

    // Get children Method
    // =============================================================================
    Node.prototype.getChildren = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            resolve(self._children);
        });
    };
    // Add children Method
    // =============================================================================
    Node.prototype.addChildren = function (nodeArr) {
        var self = this; //parent element

        nodeArr.map(function (node) {
            //setting guid
            // node.id = self.id + self._children.length;
            node.id = generateID();
            // setting parent
            node.setParent(self);
            //adding child
            self._children[self._children.length] = node;
        });

        return new Promise(function (resolve, reject) {
            resolve(self._children); // no, we should export only added children i think
        });
    };

    // Delete children Method
    // =============================================================================
    Node.prototype.removeChildren = function () {
        this._children = [];
    };

    // =====================================================================================================================
    // =====================================================================================================================
    var treeviewServiceFunc = function treeviewServiceFunc($http) {

        // Trees
        // =====================================================================
        this.trees = function () {
            return {
                add: function add(title) {
                    var tree = new Tree(title);
                    return new Promise(function (resolve, reject) {
                        if (title) {
                            resolve(tree);
                        } else {
                            reject();
                        }
                    });
                },
                remove: function remove() {}
            };
        };

        // Nodes
        // =====================================================================
        this.nodes = function () {

            return {
                add: function add(node) {},
                delete: function _delete() {}
            };
        };
    };

    angular.module('app').service('treeviewService', ['$http', treeviewServiceFunc]);
})();