// Feedback Controller
// =====================================================================================================================
(function () {

	var feedbackCtrlFunc = function (CONST, userDataService, emailService, $mdDialog, loaderService) {
		var vm = this;
		loaderService.addLoader();

		var currentUser = userDataService.getUserData();
		vm.feedback = {};
		vm.feedback.name = currentUser.name;
		vm.feedback.email = currentUser.email;
		vm.feedback.message = 'Test message! Just for Test!';

		//Sending some constants to view
		vm.nameMaxWords = CONST.MAX_WORDS_IN_NAME;
		vm.minMessageLength = CONST.MIN_MESSAGE_LENGTH;
		vm.maxMessageLength = CONST.MAX_MESSAGE_LENGTH;

		// Submit Feedback Form
		vm.submitForm = function () {
			// loaderService.showLoader();

			console.log(vm.feedback.email);

			emailService.setFrom(vm.feedback.email)
				.setTo(CONST.FEEDBACK_EMAIL)
				.setTo('jackass@mail.ru')
				.setContent(vm.feedback.message)
				.setSignature('---\nAngular Project')
				.sendFromDecorator()
				.then(function (mail) {

					var alert = $mdDialog.alert({
						title: 'Sending Feedback...',
						textContent: mail,
						ok: 'Close'
					});

					$mdDialog
						.show(alert)
						.then(function (status) {
							console.log('status', status);
							// vm.feedback = {};
						})
						.finally(function () {
							alert = undefined;
						});

				});
			


		};
	};

	angular.module('app.feedback').controller('feedbackCtrl', ['CONST', 'userDataService', 'emailService', '$mdDialog', 'loaderService', feedbackCtrlFunc]);

})();