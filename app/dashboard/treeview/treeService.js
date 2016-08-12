"use strict";
// Tree View Service
// =====================================================================================================================
(function () {

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
            node.id = self.id + self._children.length;
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
    var treeviewServiceFunc = function ($http) {

        // Trees
        // =====================================================================
        this.trees = function () {
            return {
                add: function () {
                    $http({
                        method: 'GET',
                        url: '/api/getTree'
                    }).then(function (res) {
                        console.log(res.data);
                        return res.data;
                    });
                },
                remove: function () {

                }
            }
        };

        // Nodes
        // =====================================================================
        this.nodes = function () {

            return {
                add: function (node) {

                },
                delete: function () {

                }
            }

        }
    };

    angular.module('app').service('treeviewService', ['$http', treeviewServiceFunc]);

})();