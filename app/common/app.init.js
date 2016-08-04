'use strict';

// Bootstrapping
angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});

angular.module('app', ['ui.router', 'pascalprecht.translate', 'ngMaterial']);

angular.module('app.auth',[]);