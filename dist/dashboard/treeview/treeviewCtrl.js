'use strict';

// Tree View Controller
// =====================================================================================================================
(function () {

    var treeviewCtrlFunc = function treeviewCtrlFunc($scope, treeviewService, $state) {
        var vm = this;
        var tree = treeviewService.trees();

        tree.add();
    };

    angular.module('app').controller('treeviewCtrl', ['$scope', 'treeviewService', '$state', treeviewCtrlFunc]);
})();