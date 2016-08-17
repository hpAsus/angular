'use strict';

// At Action Button Directive
// =====================================================================================================================
(function () {
    var atActionButtonDirective = function atActionButtonDirective() {
        return {
            restrict: 'E',
            link: function link(scope, elem, attrs, ctrl) {}
        };
    };
    angular.module('atActionButton').directive('atActionButton', [atActionButtonDirective]);
})();