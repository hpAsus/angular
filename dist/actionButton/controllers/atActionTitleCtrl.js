'use strict';

// At Action Item Directive
// =====================================================================================================================
(function () {
    var atActionTitleFunc = function atActionTitleFunc() {
        return {
            restrict: 'E',
            templateUrl: 'app/actionButton/tpl/atActionTitle.tpl.html',

            link: function link(scope, elem, attrs, ctrl) {}
        };
    };
    angular.module('atActionButton').directive('atActionTitle', [atActionTitleFunc]);
})();