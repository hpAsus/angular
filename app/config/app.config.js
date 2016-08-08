// MAIN APP CONFIG
// =====================================================================================================================
(function () {

    var appConfig = function ($mdThemingProvider, localStorageServiceProvider) {

        // LocalStorage config
        // =============================================================================================================
        localStorageServiceProvider
            .setPrefix('at');

        // Material config
        // =============================================================================================================
        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('orange')
            .warnPalette('red');
    };

    angular.module('app').config(['$mdThemingProvider', 'localStorageServiceProvider', appConfig]);

})();