//Config for ui router
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            abstract: true,
            templateUrl: 'app/tpl/layout.tpl.html'
        })
        .state('home', {
            url: '/',
            parent: 'root',
            templateUrl: 'app/tpl/index.tpl.html'
        })
        .state('createcard', {
            url: '/create',
            parent: 'root',

            templateUrl: 'app/tpl/createCard.tpl.html',
            controller: 'createCardCtrl',
            controllerAs: 'vm',
        })

        // Profile pages
        .state('profile', {
            abstract: true,
            parent: 'root',
            url: '/profile',
            templateUrl: 'app/profile/tpl/profile.tpl.html',
            controller: 'profileCtrl',
            controllerAs: 'vm'
        })
        .state('viewProfile', {
            url: '/view',
            parent: 'profile',
            templateUrl: 'app/profile/tpl/profileView.tpl.html',
            controller: 'profileViewCtrl',
            controllerAs: 'vm'
        })
        .state('editProfile', {
            url: '/edit',
            parent: 'profile',
            templateUrl: 'app/profile/tpl/profileEdit.tpl.html',
            controller: 'profileEditCtrl',
            controllerAs: 'vm'
        })

        // Login pages
        .state('auth', {
            abstract: true,
            url: '/auth',
            templateUrl: 'app/auth/tpl/auth.tpl.html'
        })
        .state('login', {
            url: '/signin',
            parent: 'auth',
            templateUrl: 'app/auth/tpl/login.tpl.html',
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
            templateUrl: 'app/auth/tpl/forgotPassword.tpl.html',
            controller: 'forgotCtrl',
            controllerAs: 'vm'
        });
}]);