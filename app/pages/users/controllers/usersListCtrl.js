// Users List Controller
// =====================================================================================================================
(function () {

	var usersListCtrlFunc = function ($state, $mdDialog, usersService) {
		var vm = this;

		// // setting current tab
		// vm.currentNavItem = $state.current.name;
		//
		// $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		// 	vm.currentNavItem = toState.name;
		// });


		// Get All Users
		usersService.getAllUsers().then(function (data) {
			vm.users = data.data.users;
		});


		//Create New User
		vm.createNewUser = function (ev) {
			$mdDialog.show({
					controller: 'createUserCtrl',
					controllerAs: 'vm',
					templateUrl: 'app/pages/users/tpl/createUser.tpl.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: true
				})
				.then(function (answer) {
					vm.status = 'You said the information was "' + answer + '".';
				}, function () {
					vm.status = 'You cancelled the dialog.';
				});
		};

		//deleteUser
		vm.deleteUser = function (ev, login) {

			var confirm = $mdDialog.confirm()
				.title('User Delete Confirm')
				.textContent('Are you really want to remove this user from database ')
				.ariaLabel('Delete user')
				.targetEvent(ev)
				.ok('Please do it!')
				.cancel('No, I changed my mind');
			$mdDialog.show(confirm).then(function () {
				console.log('Here we delete User');
				vm.status = 'You decided to get rid of your debt.';
			}, function () {
			});

		};


	};

	angular.module('app.users').controller('usersListCtrl', ['$state', '$mdDialog', 'usersService', usersListCtrlFunc]);

})();