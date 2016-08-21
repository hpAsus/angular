// Tree View Service
// =====================================================================================================================
(function () {
    var treeviewServiceFunc = function ($http, $q) {

        // NODE ENTITY
        // =============================================================================================================
        class NODE {
            constructor(title) {
                this.id = generateID();
                this.metadata = {
                    'title': title
                };
                this._children = [];
            }

            // Get children Method
            // =============================================================================
            static getChildren() {
                var self = this;
                var deferred = $q.defer();
                deferred.resolve(self._children);
                return deferred.promise;
            }

            // Add children Method
            // =============================================================================
            static addChildren(node) {
                var self = this;
                var deferred = $q.defer();

                self._children.push(node);
                deferred.resolve(self._children);

                return deferred.promise;
            }

        }

        // Generate uniq ID Helper Method
        // =============================================================================
        function generateID() {
            var d = new Date().getTime();
            var id;
            id = 'yxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return id;
        }
        

// =====================================================================================================================
// =====================================================================================================================
// =====================================================================================================================
        var self = this;
        self.rootTree = null;
        self.treeJSON = null;
        self.nodesHeap = [];


        // Trees
        // =====================================================================
        self.trees = function () {
            //nodes from server
            // var nodes = self.treeJSON;

            return {
                //Add Tree Method
                add: function (tree) {
                    var deferred = $q.defer();
                    // var rootNode = new NODE(tree.rootNode.metadata.title);

                    //add rootNode to nodesHeap
                    // self.nodesHeap.push(rootNode);

                    //resolve rootNode
                    deferred.resolve(new NODE(tree.rootNode.metadata.title));

                    return deferred.promise;

                },
                // Remove Tree Method
                remove: function () {
                    var deffered = $q.defer();

                    // May be it should be more complicated
                    self.rootTree = null;
                    deffered.resolve(self.rootTree);

                    return deffered.promise;

                }
            }
        };

        // Nodes
        // =====================================================================
        self.nodes = function () {

            return {
                //Add Node Method
                add: function (nodeTitle) {
                    var node;
                    var deffered = $q.defer();

                    node = new NODE(nodeTitle);
                    self.nodesHeap.push(node);
                    deffered.resolve(node);

                    return deffered.promise;

                },
                //Delete Node Method
                delete: function () {
                    var deffered = $q.defer();

                    // delete and resolve(void)

                    return deffered.promise;

                }
            }

        }
    };

    angular.module('app').service('treeviewService', ['$http', '$q', treeviewServiceFunc]);

})();