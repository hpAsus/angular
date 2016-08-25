// Users Service
// =====================================================================================================================
(function () {

	var usersServiceFunc = function ($http) {

		// user login
		this.getAllUsers = function () {
			return $http({
				method: 'GET',
				url: '/api/userslist'
			});
		};

	
	};

	angular.module('app.users').service('usersService', ['$http', usersServiceFunc]);

})();