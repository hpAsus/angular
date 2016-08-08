//Config for ui router
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            abstract: true,
            templateUrl: 'app/root/root.tpl.html',
            controller: 'rootCtrl',
            controllerAs: 'root',
            resolve: {
              userData: function($http) {
                return $http({
                    method: 'GET',
                    url: '/api/getuserdata'
                }).then(function(res) {
                    return res.data.user;
                });
              }
            }
        })
        .state('home', {
            url: '/',
            parent: 'root',
            templateUrl: 'app/index/index.tpl.html'
        })

// Dashboard
// =====================================================================================================================
        .state('dashboard', {
            abstract: true,
            resolve: {
                userData: function($http) {
                    return $http({
                        method: 'GET',
                        url: '/api/getuserdata'
                    }).then(function(res) {
                        return res.data.user;
                    });
                }
            },
            data: {
                secure: true
            },
            templateUrl: 'app/dashboard/dashboard.tpl.html',
            controller: 'dashboardCtrl',
            controllerAs: 'dashboard'
        })

// Profile Pages
// =====================================================================================================================
        .state('profile', {
            abstract: true,
            parent: 'dashboard',
            url: '/profile',
            templateUrl: 'app/dashboard/profile/profile.tpl.html',
            controller: 'profileCtrl',
            controllerAs: 'profile'
        })
        .state('viewProfile', {
            url: '/view',
            parent: 'profile',
            templateUrl: 'app/dashboard/profile/view/profileView.tpl.html',
            controller: 'profileViewCtrl',
            controllerAs: 'vm'
        })
        .state('editProfile', {
            url: '/edit',
            resolve: {
                userData: function($http) {
                    return $http({
                        method: 'GET',
                        url: '/api/getuserdata'
                    }).then(function(res) {
                        return res.data.user;
                    });
                }
            },
            parent: 'profile',
            templateUrl: 'app/dashboard/profile/edit/profileEdit.tpl.html',
            controller: 'profileEditCtrl',
            controllerAs: 'vm'
        })

// Auth Pages
// =====================================================================================================================
        .state('auth', {
            abstract: true,
            url: '/auth',
            templateUrl: 'app/auth/auth.tpl.html'
        })
        .state('login', {
            url: '/signin',
            parent: 'auth',
            resolve: {
                userData: function($http) {
                    return $http({
                        method: 'GET',
                        url: '/api/getuserdata'
                    }).then(function(res) {
                        return res.data.user;
                    });
                }
            },
            templateUrl: 'app/auth/login/login.tpl.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        })
        .state('logout', {
            url: '/logout',
            parent: 'auth',
            controller: 'logoutCtrl'
        })
        .state('forgot', {
            url: '/reset',
            parent: 'auth',
            templateUrl: 'app/auth/forgot/forgot.tpl.html',
            controller: 'forgotCtrl',
            controllerAs: 'vm'
        });
}]);