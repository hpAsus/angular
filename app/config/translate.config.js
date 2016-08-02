app.config(['$translateProvider', function($translateProvider) {
    //$translateProvider.translations('en', {
    //    "APP_TITLE": "Some title",
    //    "INTRODUCTION_TEXT": "Come together and meet great people!"
    //});
    //$translateProvider.translations('ru', {
    //    "APP_TITLE": "Некий текст",
    //    "INTRODUCTION_TEXT": "Комон эври бади, челы!"
    //});

    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.preferredLanguage('en');

    $translateProvider.useStaticFilesLoader({
        prefix: 'app/lang/lang-',
        suffix: '.json'
    });
}]);
