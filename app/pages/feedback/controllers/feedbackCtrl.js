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

		//Sending some constants to view
		vm.nameMaxWords = CONST.MAX_WORDS_IN_NAME;
		vm.minMessageLength = CONST.MIN_MESSAGE_LENGTH;
		vm.maxMessageLength = CONST.MAX_MESSAGE_LENGTH;

		// Submit Feedback Form
		vm.submitForm = function () {
			// loaderService.showLoader();
			
			emailService
				.setTo(vm.feedback.email).then(function (data) {
				console.log(data);
			});
			

			emailService.SEND(vm.feedback.email, CONST.FEEDBACK_EMAIL, vm.feedback.message)
				.then(function (data) {

					var alert = $mdDialog.alert({
						title: 'Sending Feedback...',
						textContent: data,
						ok: 'Close'
					});

					$mdDialog
						.show(alert)
						.then(function (status) {
							console.log(status);
							vm.feedback = {};
						})
						.finally(function () {

							alert = undefined;
						});

				});


		};
	};

	angular.module('app.feedback').controller('feedbackCtrl', ['CONST', 'userDataService', 'emailService', '$mdDialog', 'loaderService', feedbackCtrlFunc]);

})();