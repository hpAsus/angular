// At Action Button Directive
// =====================================================================================================================
(function () {
    var atActionButtonDirective = function () {
        return {
            restrict: 'E',
            scope: {
                buttonTitle: '@buttonTitle'
            },
            // bindToController: true,
            controller: 'atActionButtonCtrl as vm',
            templateUrl: 'app/actionButtonComponent/tpl/atActionButton.tpl.html',
            transclude: true
        };
    };
    angular.module('atActionButton').directive('atActionButton', [atActionButtonDirective]);
})();