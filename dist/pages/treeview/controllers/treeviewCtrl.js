'use strict';

// Tree View Controller
// =====================================================================================================================
(function () {

    var treeviewCtrlFunc = function treeviewCtrlFunc($scope, $http, treeviewService) {
        var vm = this;

        // Get Tree From server
        $http.get('/api/getTree').then(function (res) {
            var inputTree = res.data.tree;
            var inputRootNode = inputTree.rootNode;
            //input tree
            console.log('Input tree', inputTree);

            treeviewService.trees().add(inputTree).then(function (rootNode) {
                var count = 1;
                console.log(rootNode);

                // Traversing nodes
                function listItem(current) {

                    treeviewService.nodes().add(current.metadata.title).then(function (node) {
                        console.log(node);
                        var children = current.children;
                        _.forEach(children, function (child) {
                            console.log(count + '. ' + child.metadata.title);
                            node.addChildren(child);
                            listItem(child);
                            count++;
                        });
                    });
                }
                listItem(inputRootNode);
            });
        });
    };

    angular.module('app').controller('treeviewCtrl', ['$scope', '$http', 'treeviewService', treeviewCtrlFunc]);
})();