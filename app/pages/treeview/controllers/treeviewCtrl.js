// Tree View Controller
// =====================================================================================================================
(function () {

    var treeviewCtrlFunc = function ($scope, $http, treeViewFactory) {
        var vm = this;

        // Get Tree From server
        $http.get('/api/getTree')
            .then(function (res) {
                var inputTree = res.data.tree;
                var inputRootNode = inputTree.rootNode;

                //input tree
                console.log('Input tree', inputTree);
                
                function listNodes(currentNode) {
                    treeViewFactory.nodes.add(currentNode)
                        .then(function (node) {
                            // console.log(node);
                            var children = currentNode.children;
                            _.forEach(children, function (child) {
                                // console.log(child.metadata.title);
                                listNodes(child);
                            });

                        });
                }
                // listNodes(inputRootNode);

                treeViewFactory.trees.add(inputRootNode);
                // treeViewFactory.render.tree().then(function (tree) {
                //     vm.tree = tree;
                // });

                // vm.$watch('tree', function () {
                //
                // })
            });


    };


    angular.module('app').controller('treeviewCtrl', ['$scope', '$http', 'treeViewFactory', treeviewCtrlFunc]);

})();