// Users Service
// =====================================================================================================================
(function () {

	var usersServiceFunc = function ($http) {

		// getAllUsers
		this.getAllUsers = function () {
			return $http({
				method: 'GET',
				url: '/api/userslist'
			});
		};


		// Create User
		this.createUser = function (data) {
			return $http({
				method: 'POST',
				url: 'api/createUser',
				data: data
			});
		};

		// Delete user
		this.deleteUser = function (login) {
			return $http({
				method: 'DELETE',
				url: 'api/users/' + login,
				data: login
			});
		};

	
	};

	angular.module('app.users').service('usersService', ['$http', usersServiceFunc]);

})();