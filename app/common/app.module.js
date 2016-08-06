'use strict';
(function () {

    // Bootstrapping
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });

    // Main App module
    angular.module('app', ['ui.router', 'pascalprecht.translate', 'ngMaterial', 'app.auth', 'app.profile']);

})();

