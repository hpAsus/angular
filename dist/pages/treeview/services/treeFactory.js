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
                var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

                _classCallCheck(this, atNODE);

                this.id = atNODE._guid++;
                this.depth = depth;
                this.metadata = nodeObj.metadata;
                this._children = [];

                nodeObj.children && this.addChildren(nodeObj.children);
                console.log('[' + this.id + '] – [' + this.metadata.title + '] depth = ' + this.depth);

                heapStorage.push($q.all(this));
            }

            // Get children Method
            // =============================================================================


            _createClass(atNODE, [{
                key: 'getChildren',
                value: function getChildren() {
                    var self = this;
                    return $q.all(self._children);
                }

                // Add children Method
                // =============================================================================

            }, {
                key: 'addChildren',
                value: function addChildren(arr) {
                    var self = this;
                    self._children = _.map(arr, function (item) {
                        $timeout(function () {
                            return new atNODE(item, self.depth + 1);
                        }, 1000 + 1000 * Math.random());
                    });
                    return this.getChildren();
                }
            }]);

            return atNODE;
        }();

        // GUID


        atNODE._guid = 0;

        // Factory Exports
        // =============================================================================================================
        return {
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
            nodes: {
                add: function add(node) {
                    console.log(node);
                    var defer = $q.defer();
                    defer.resolve(new atNODE(node));
                    return defer.promise;
                },
                delete: function _delete() {
                    console.log('Delete node from Tree');
                }
            },
            render: {
                tree: function tree() {
                    // var defer = $q.defer();
                    // defer.resolve(heapStorage);
                    // return defer.promise;
                    // console.log(heapStorage);
                    return $q.all(heapStorage);
                }
            }
        };
    };

    angular.module('app').factory('treeViewFactory', ['$http', '$q', '$timeout', treeViewFactoryFunc]);
})();