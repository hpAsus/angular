// At Action Button Directive
// =====================================================================================================================
(function () {
    var atActionButtonDirective = function () {
        return {
            restrict: 'E',
            scope: {
                buttonTitle: '@buttonTitle'
            },
            link: function (scope, element, attrs) {
                scope.showActionsMenu = false;

                scope.showActions = function () {
                    scope.showActionsMenu = scope.showActionsMenu ? false : true;
                };
            },
            controller: 'atActionButtonCtrl as vm',
            templateUrl: 'app/actionButton/tpl/atActionButton.tpl.html',
            transclude: true
        };
    };
    angular.module('atActionButton').directive('atActionButton', [atActionButtonDirective]);
})();