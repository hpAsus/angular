'use strict';

// Bootstrapping
angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});

var app = angular.module('app', ['ui.router', 'pascalprecht.translate', 'ngMaterial']);

var auth = angular.module('app.auth',[]);