'use strict';

// Tree View Controller
// =====================================================================================================================
(function () {

    var treeviewCtrlFunc = function treeviewCtrlFunc($scope, $http, $timeout, treeViewFactory) {
        var vm = this;

        // Get Tree From server
        $http.get('/api/getTree').then(function (res) {
            var inputTree = res.data.tree;
            var inputRootNode = inputTree.rootNode;

            //input tree
            console.log('Input tree', inputTree);

            var rootNode = new treeViewFactory.atNODE(inputRootNode);
            treeViewFactory.trees.add(rootNode).then(function (root) {
                console.log(root);

                function listNodes(currentNode) {
                    var newNode = new treeViewFactory.atNODE(currentNode);

                    treeViewFactory.nodes.add(newNode).then(function () {

                        _.forEach(currentNode.children, function (child) {

                            var timeGap = $timeout(angular.noop, 1000 + 5 * 1000 * Math.random());
                            timeGap.then(function () {
                                var childNode = new treeViewFactory.atNODE(child);
                                newNode.addChildren(childNode.id).then(function () {
                                    console.log('[Gaped] ', child.metadata.title);
                                });
                            });

                            listNodes(child);
                        });
                    });
                }
                listNodes(inputRootNode);
            });

            console.log(treeViewFactory.render.heap());
        });
    };

    angular.module('app').controller('treeviewCtrl', ['$scope', '$http', '$timeout', 'treeViewFactory', treeviewCtrlFunc]);
})();