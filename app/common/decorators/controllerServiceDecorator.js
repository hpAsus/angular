// $controller Service Decorator
// =====================================================================================================================
/*(function () {

    var controllerServiceDecoratorFunc = function $controllerDecorator($delegate, $log) {
        return function (constructor, locals) {
            //Custom decorator code

            console.groupCollapsed(typeof constructor);
            $log.info('constructor', constructor);
            $log.info('typeof constructor', typeof constructor);
            $log.info('locals', locals);
            $log.info('arguments', arguments);
            console.groupEnd();

            return $delegate(constructor, locals, true);
        };
    };

    angular.module('app').config(['$provide', function ($provide) {
        $provide.decorator('$controller', ['$delegate', '$log', controllerServiceDecoratorFunc]);
    }]);

})();*/
(function () {

    var controllerServiceDecoratorFunc = function $controllerDecorator($delegate, $log) {
        return function (constructor, locals) {
            //Custom decorator code

            console.groupCollapsed(typeof constructor);
            $log.info('constructor', constructor);
            $log.info('typeof constructor', typeof constructor);
            $log.info('locals', locals);
            $log.info('arguments', arguments);
            console.groupEnd();

            return $delegate(constructor, locals, true);
        };
    };

    // angular.module('controllerServiceDecorator', ['ng'], ['$provide', function ($provide) {
    //     $provide.decorator('$controller', ['$delegate', '$log', controllerServiceDecoratorFunc]);
    // }]);

    // .config(['$provide', function ($provide) {
    //     $provide.decorator('$controller', ['$delegate', '$log', controllerServiceDecoratorFunc]);
    // }])

})();
