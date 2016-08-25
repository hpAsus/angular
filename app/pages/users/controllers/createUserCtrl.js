// Create User Controller
// =====================================================================================================================
(function () {

	var createUserCtrlFunc = function (usersService, $mdDialog) {
		var vm = this;

		vm.cancel = function() {
			$mdDialog.cancel();
		};


	};

	angular.module('app.users').controller('createUserCtrl', ['usersService', '$mdDialog', createUserCtrlFunc]);

})();