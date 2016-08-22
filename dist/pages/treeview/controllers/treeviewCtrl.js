'use strict';

// Tree View Controller
// =====================================================================================================================
(function () {

    var treeviewCtrlFunc = function treeviewCtrlFunc($scope, $http, treeViewFactory) {
        var vm = this;

        // Get Tree From server
        $http.get('/api/getTree').then(function (res) {
            var inputTree = res.data.tree;
            var inputRootNode = inputTree.rootNode;

            //input tree
            console.log('Input tree', inputTree);

            function listNodes(currentNode) {
                var newNode = new treeViewFactory.atNODE(currentNode);
                treeViewFactory.nodes.add(newNode).then(function () {

                    _.forEach(currentNode.children, function (child) {

                        var childNode = new treeViewFactory.atNODE(child);
                        newNode.addChildren(childNode.id);

                        listNodes(child);
                    });
                });
            }
            listNodes(inputRootNode);
            console.log(treeViewFactory.render.heap());
        });
    };

    angular.module('app').controller('treeviewCtrl', ['$scope', '$http', 'treeViewFactory', treeviewCtrlFunc]);
})();