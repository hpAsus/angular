// Tree View Service
// =====================================================================================================================
(function () {
    var treeViewFactoryFunc = function ($http, $q, $timeout) {

        var heapStorage = [];

        // NODE ENTITY
        // =============================================================================================================
        class atNODE {
            constructor(nodeObj) {
                this.id = String(nodeObj.id || atNODE._guid++);
                this.metadata = nodeObj.metadata;
                this._children = [];
            }

            // Get children Method
            // =============================================================================
            getChildren() {
                var self = this;
                var defer = $q.defer();

                //find children in heapStorage
                var children = _.map(self._children, () => _.find(heapStorage, (node) => node.id === self.id));

                defer.resolve(children);
                return defer.promise;
            }

            // Add children Method
            // =============================================================================
            addChildren(childId) {
                var self = this;
                var defer = $q.defer();

                self._children.push(childId);
                defer.resolve(this.getChildren());

                return defer.promise;
            }

        }

        // GUID
        atNODE._guid = 0;


        // Factory Exports
        // =============================================================================================================
        return {
            atNODE: atNODE,
            // =============================================================================
            trees: {
                add: function (rootNode) {
                    var defer = $q.defer();
                    defer.resolve(new atNODE(rootNode));
                    return defer.promise;
                },
                remove: function () {
                    var defer = $q.defer();
                    heapStorage = null;
                    defer.resolve(heapStorage);
                    return defer.promise;
                }
            },
            // =============================================================================
            nodes: {
                add: function (node) {
                    var defer = $q.defer();

                    // metadata check
                    if(!node.metadata) {
                        defer.reject('Incorrect node metadata');
                    }

                    // add node to heapStorage
                    heapStorage.push(node);

                    // resolve node
                    defer.resolve(node);

                    return defer.promise;
                },
                delete: function () {
                    console.log('Delete node from Tree')
                }
            },
            // =============================================================================
            render: {
                heap: function () {
                  return  heapStorage;
                }
            }
        };

    };

    angular.module('app').factory('treeViewFactory', ['$http', '$q', '$timeout', treeViewFactoryFunc]);

})();