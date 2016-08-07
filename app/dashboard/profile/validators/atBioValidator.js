angular.module('app').directive('atBioValidator', ['CONST_VALIDATORS', function(CONST_VALIDATORS) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {

            // check for minimum length
            ctrl.$validators.bioValidator = function (modelValue) {
                if (modelValue) {
                    return modelValue.length >= CONST_VALIDATORS.MIN_GREETING_LENGTH;
                }
            };
        }
    };
}]);