'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Tree View Service
// =====================================================================================================================
(function () {
    var treeViewFactoryFunc = function treeViewFactoryFunc($http, $q, $timeout) {

        var _heapStorage = [];
        // var heapStorage = new Array();
        var count = 1;

        // NODE ENTITY
        // =============================================================================================================

        var atNODE = function () {
            function atNODE(nodeObj) {
                _classCallCheck(this, atNODE);

                this.id = nodeObj.id || String('node' + atNODE._guid++);
                this.metadata = nodeObj.metadata;
                this._parent = null;
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
                    var children = _.map(self._children, function (childId) {
                        return _.find(_heapStorage, function (node) {
                            return node.id === childId;
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
                    // var timeGap = $timeout(angular.noop, 0);
                    var timeGap = $timeout(angular.noop, 1000 + 2 * 1000 * Math.random());

                    timeGap.then(function () {
                        self._children.push(childId);
                        var child = _.find(_heapStorage, function (node) {
                            return node.id == childId;
                        });
                        console.log(count++ + ' [Child Added] [ID: ' + childId + ']', child.metadata.title);

                        defer.resolve();
                    });

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
                    // metadata check
                    if (!rootNode.metadata) {
                        defer.reject('Incorrect node metadata');
                    }
                    // add node to heapStorage
                    _heapStorage.push(rootNode);
                    console.log('0 [ROOT  Added] ' + '[ID: ' + rootNode.id + ']', rootNode.metadata.title);

                    defer.resolve(rootNode);
                    return defer.promise;
                },
                remove: function remove() {
                    var defer = $q.defer();
                    _heapStorage = null;
                    defer.resolve(_heapStorage);
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
                    _heapStorage.push(node);

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
                heapStorage: function heapStorage() {
                    return _heapStorage;
                    // var defer = $q.defer();
                    // defer.resolve(heapStorage);
                    // return defer.promise;
                }
            }

        };
    };

    angular.module('app').factory('treeViewFactory', ['$http', '$q', '$timeout', treeViewFactoryFunc]);
})();