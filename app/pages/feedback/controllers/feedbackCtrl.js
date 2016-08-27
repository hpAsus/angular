// Feedback Controller
// =====================================================================================================================
(function () {

    var feedbackCtrlFunc = function (CONST, userDataService, emailService) {
        var vm = this;

        var currentUser = userDataService.getUserData();
        vm.feedback = {};
        vm.feedback.name = currentUser.name;
        vm.feedback.email = currentUser.email;

        //Sending some constants to view
        vm.nameMaxWords = CONST.MAX_WORDS_IN_NAME;
        vm.minMessageLength = CONST.MIN_MESSAGE_LENGTH;
        vm.maxMessageLength = CONST.MAX_MESSAGE_LENGTH;

        // Submit Feedback Form
        vm.submitForm = function () {

            emailService.SEND(vm.feedback.email, CONST.FEEDBACK_EMAIL, vm.feedback.message);
            console.log(vm.feedback);
        };
    };

    angular.module('app.feedback').controller('feedbackCtrl', ['CONST', 'userDataService', 'emailService', feedbackCtrlFunc]);

})();