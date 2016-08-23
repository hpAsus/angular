'use strict';

// Tree View Controller
// =====================================================================================================================
(function () {

    var treeViewCtrlFunc = function treeViewCtrlFunc($scope, $http, $timeout, $q, treeViewFactory) {
        var vm = this;

        // Get Tree From server
        $http.get('/api/getTree').then(function (res) {
            var inputTree = res.data.tree;
            var inputRootNode = inputTree.rootNode;
            var rootNode = new treeViewFactory.atNODE(inputRootNode);

            treeViewFactory.trees.add(rootNode).then(function (root) {

                function addRecursive(parent, children) {

                    _.forEach(children, function (child) {
                        treeViewFactory.nodes.add(new treeViewFactory.atNODE(child)).then(function (node) {

                            parent.addChildren(node.id).then(function () {
                                addRecursive(node, child.children);
                            });
                        });
                    });
                }

                addRecursive(root, inputRootNode.children);

                // console.log(treeViewFactory.render.heapStorage());
            });
        });
    };

    angular.module('app').controller('treeViewCtrl', ['$scope', '$http', '$timeout', '$q', 'treeViewFactory', treeViewCtrlFunc]);
})();