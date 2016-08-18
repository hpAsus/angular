'use strict';

// At Action Item Directive
// =====================================================================================================================
(function () {
    var atActionItemFunc = function atActionItemFunc() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/actionButton/tpl/atActionItem.tpl.html',

            link: function link(scope, elem, attrs, ctrl) {}
        };
    };
    angular.module('atActionButton').directive('atActionItem', [atActionItemFunc]);
})();