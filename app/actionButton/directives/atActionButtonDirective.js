// At Action Button Directive
// =====================================================================================================================
(function () {
    var atActionButtonDirective = function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs, ctrl) {

            }
        };
    };
    angular.module('atActionButton').directive('atActionButton', [atActionButtonDirective]);
})();