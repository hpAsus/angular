// At Action Item Directive
// =====================================================================================================================
(function () {
    var atActionItemFunc = function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/actionButton/tpl/atActionItem.tpl.html',

            link: function (scope, elem, attrs, ctrl) {

            }
        };
    };
    angular.module('atActionButton').directive('atActionItem', [atActionItemFunc]);
})();