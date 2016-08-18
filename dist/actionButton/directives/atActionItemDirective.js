'use strict';

// At Action Item Directive
// =====================================================================================================================
(function () {
    var atActionItemFunc = function atActionItemFunc() {
        return {
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            templateUrl: 'app/actionButton/tpl/atActionItem.tpl.html',
            controller: 'atActionItemCtrl as vm',
            transclude: true,
            link: function link(scope, elem, attrs, ctrl) {}
        };
    };
    angular.module('atActionButton').directive('atActionItem', [atActionItemFunc]);
})();