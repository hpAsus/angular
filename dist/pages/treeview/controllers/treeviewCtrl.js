'use strict';

// Tree View Controller
// =====================================================================================================================
(function () {

    var treeViewCtrlFunc = function treeViewCtrlFunc($scope, $http, $timeout, treeViewFactory) {
        var vm = this;

        // Get Tree From server
        $http.get('/api/getTree').then(function (res) {
            var inputTree = res.data.tree;
            var inputRootNode = inputTree.rootNode;
            var rootNode = new treeViewFactory.atNODE(inputRootNode);

            treeViewFactory.trees.add(rootNode).then(function (root) {

                function listNodes(currentNode) {
                    var newNode = new treeViewFactory.atNODE(currentNode);
                    treeViewFactory.nodes.add(newNode).then(function () {
                        _.forEach(currentNode.children, function (child) {
                            var timeGap = $timeout(angular.noop, 1000 + 5 * 1000 * Math.random());
                            timeGap.then(function () {
                                var childNode = new treeViewFactory.atNODE(child);
                                newNode.addChildren(childNode.id).then(function () {
                                    // console.log('[Node Created] ', child.metadata.title);
                                });
                            });
                            listNodes(child);
                        });
                    });
                }
                listNodes(inputRootNode);
                return treeViewFactory.render.heapStorage();
            }).then(function (promiseHeap) {
                var rootNode = promiseHeap[0];
                //process promises
                console.log(promiseHeap);
                console.log(rootNode._children);

                rootNode.getChildren().then(function (children) {
                    console.log(children);
                });
            });
        });
    };

    angular.module('app').controller('treeViewCtrl', ['$scope', '$http', '$timeout', 'treeViewFactory', treeViewCtrlFunc]);
})();