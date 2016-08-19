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
            transclude: true
        };
    };
    angular.module('atActionButton').directive('atActionItem', [atActionItemFunc]);
})();