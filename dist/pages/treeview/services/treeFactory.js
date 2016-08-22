'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Tree View Service
// =====================================================================================================================
(function () {
    var treeViewFactoryFunc = function treeViewFactoryFunc($http, $q, $timeout) {

        var heapStorage = [];

        // NODE ENTITY
        // =============================================================================================================

        var atNODE = function () {
            function atNODE(nodeObj) {
                _classCallCheck(this, atNODE);

                this.id = String(nodeObj.id || atNODE._guid++);
                this.metadata = nodeObj.metadata;
                this._children = [];
            }

            // Get children Method
            // =============================================================================


            _createClass(atNODE, [{
                key: 'getChildren',
                value: function getChildren() {
                    var self = this;
                    var defer = $q.defer();

                    //find children in heapStorage
                    var children = _.map(self._children, function () {
                        return _.find(heapStorage, function (node) {
                            return node.id === self.id;
                        });
                    });

                    defer.resolve(children);
                    return defer.promise;
                }

                // Add children Method
                // =============================================================================

            }, {
                key: 'addChildren',
                value: function addChildren(childId) {
                    var self = this;
                    var defer = $q.defer();

                    self._children.push(childId);
                    defer.resolve(this.getChildren());

                    return defer.promise;
                }
            }]);

            return atNODE;
        }();

        // GUID


        atNODE._guid = 0;

        // Factory Exports
        // =============================================================================================================
        return {
            atNODE: atNODE,
            // =============================================================================
            trees: {
                add: function add(rootNode) {
                    var defer = $q.defer();
                    defer.resolve(new atNODE(rootNode));
                    return defer.promise;
                },
                remove: function remove() {
                    var defer = $q.defer();
                    heapStorage = null;
                    defer.resolve(heapStorage);
                    return defer.promise;
                }
            },
            // =============================================================================
            nodes: {
                add: function add(node) {
                    var defer = $q.defer();

                    // metadata check
                    if (!node.metadata) {
                        defer.reject('Incorrect node metadata');
                    }

                    // add node to heapStorage
                    heapStorage.push(node);

                    // resolve node
                    defer.resolve(node);

                    return defer.promise;
                },
                delete: function _delete() {
                    console.log('Delete node from Tree');
                }
            },
            // =============================================================================
            render: {
                heap: function heap() {
                    return heapStorage;
                }
            }
        };
    };

    angular.module('app').factory('treeViewFactory', ['$http', '$q', '$timeout', treeViewFactoryFunc]);
})();