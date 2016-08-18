'use strict';

// At Action Title Directive
// =====================================================================================================================
(function () {
    var atActionTitleFunc = function atActionTitleFunc() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/actionButton/tpl/atActionTitle.tpl.html',
            transclude: true
        };
    };
    angular.module('atActionButton').directive('atActionTitle', [atActionTitleFunc]);
})();