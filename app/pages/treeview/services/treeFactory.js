// Tree View Service
// =====================================================================================================================
(function () {
    var treeViewFactoryFunc = function ($http, $q, $timeout) {

        var heapStorage = [];

        // NODE ENTITY
        // =============================================================================================================
        class atNODE {
            constructor(nodeObj, depth = 0) {
                this.id = atNODE._guid++;
                this.depth = depth;
                this.metadata = nodeObj.metadata;
                this._children = [];

                nodeObj.children && this.addChildren(nodeObj.children);
                console.log('[' + this.id + '] – [' + this.metadata.title + '] depth = ' + this.depth);

                heapStorage.push(this);
                // heapStorage.push($q.all(this));
            }

            // Get children Method
            // =============================================================================
            getChildren() {
                var self = this;
                return $q.all(self._children);
            }

            // Add children Method
            // =============================================================================
            addChildren(arr) {
                var self = this;
                self._children = _.map(arr, (item) => {
                    $timeout(() => new atNODE(item, self.depth + 1), 1000 + 1000 * Math.random());
                });
                return this.getChildren();
            }

        }

        // GUID
        atNODE._guid = 0;


        // Factory Exports
        // =============================================================================================================
        return {
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
            nodes: {
                add: function (node) {
                    console.log(node);
                    var defer = $q.defer();
                    defer.resolve(new atNODE(node));
                    return defer.promise;
                },
                delete: function () {
                    console.log('Delete node from Tree')
                }
            },
            // render: {
            //     tree: function () {
            //         var defer = $q.defer();
            //         defer.resolve(heapStorage);
            //         return defer.promise;
            //         // console.log(heapStorage);
            //         // return $q.all(heapStorage);
            //     }
            // }
        };

    };

    angular.module('app').factory('treeViewFactory', ['$http', '$q', '$timeout', treeViewFactoryFunc]);

})();