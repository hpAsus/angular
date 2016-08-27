// Message Validator
// =====================================================================================================================
(function () {
    var atMessageValidatorFunc = function (CONST) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {

                // check for minimum length
                ctrl.$validators.messageValidator = function (modelValue) {
                    if (modelValue) {
                        return modelValue.length >= CONST.MIN_MESSAGE_LENGTH;
                    }
                };
            }
        };
    };
    angular.module('app.feedback').directive('atMessageValidator', ['CONST', atMessageValidatorFunc]);
})();
