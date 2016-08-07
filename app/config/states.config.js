//Config for ui router
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            abstract: true,
            templateUrl: 'app/root/root.tpl.html',
            controller: 'rootCtrl as root',
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
        //.state('createcard', {
        //    url: '/create',
        //    parent: 'root',
        //    data: {
        //        secure: true
        //    },
        //    templateUrl: 'app/tpl/createCard.tpl.html',
        //    controller: 'createCardCtrl',
        //    controllerAs: 'vm'
        //})

// Profile Pages
// =====================================================================================================================
        .state('profile', {
            abstract: true,
            parent: 'root',
            url: '/profile',
            data: {
                secure: true
            },
            templateUrl: 'app/profile/profile.tpl.html',
            controller: 'profileCtrl',
            controllerAs: 'vm'
        })
        .state('viewProfile', {
            url: '/view',
            parent: 'profile',
            templateUrl: 'app/profile/view/profileView.tpl.html',
            controller: 'profileViewCtrl',
            controllerAs: 'vm'
        })
        .state('editProfile', {
            url: '/edit',
            parent: 'profile',
            templateUrl: 'app/profile/edit/profileEdit.tpl.html',
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