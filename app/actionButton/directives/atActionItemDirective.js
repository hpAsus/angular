// At Action Item Directive
// =====================================================================================================================
(function () {
    var atActionItemFunc = function () {
        return {
            restrict: 'E',
            scope: {
                ngModel : '='
            },
            templateUrl: 'app/actionButton/tpl/atActionItem.tpl.html',
            controller: 'atActionItemCtrl as vm',
            transclude: true,
            link: function (scope, elem, attrs, ctrl) {
            }
        };
    };
    angular.module('atActionButton').directive('atActionItem', [atActionItemFunc]);
})();