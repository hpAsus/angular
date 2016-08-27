// Auth Service
// =====================================================================================================================
(function () {

    var authServiceFunc = function ($http) {

        // user login
        this.userLogin = function (userData) {
            return $http({
                method: 'POST',
                url: '/login',
                data: userData
            });
        };

        // reset password
        this.resetPassword = function (login) {
            return $http({
	            method: 'GET',
	            url: '/forgot',
                params: {
	                user: login
                }
            });
        };

        // user logout
        this.userLogout = function() {
            return $http({
                method: 'GET',
                url: '/logout'
            });
        };

        //check if user has access
        this.checkUserAccess = function (userRole, accessRoles) {
	        if (accessRoles) {
		        var access = accessRoles.findIndex(function (role) {
			        return role === userRole;
		        });
	        } else {
		        var access = false;
	        }

	        return !!access;
            // return (accessRoles) ? !!accessRoles.findIndex(function (role) {
            //     return role === userRole;
            // }) : false;
        };
    };

    angular.module('app.auth').service('authService', ['$http', authServiceFunc]);

})();