//Config for ui router
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

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
            controllerAs: 'vm'
        })
        .state('profile', {
            url: '/profile',
            parent: 'root',
            templateUrl: 'app/tpl/profile.tpl.html'
        })
        .state('auth', {
            abstract: true,
            url: '/auth',
            templateUrl: 'app/tpl/auth.tpl.html'
        })
        .state('login', {
            url: '/signin',
            parent: 'auth',
            templateUrl: 'app/tpl/login.tpl.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        })
        .state('forgot', {
            url: '/reset',
            parent: 'auth',
            templateUrl: 'app/tpl/forgotPassword.tpl.html',
            controller: 'forgotCtrl',
            controllerAs: 'vm'
        });
}]);