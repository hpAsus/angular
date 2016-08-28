// $controller Service Decorator
// =====================================================================================================================

(function () {

	var controllerServiceDecoratorFunc = function $controllerDecorator($delegate, $log) {
		return function () {
			var constructor = arguments[0];
			var locals = arguments[1];
			var ctrl = $delegate.apply(null, arguments);

			//Custom decorator code
			console.groupCollapsed(_.isString(constructor) ? constructor : 'Anonymous controller');
			$log.info('Controller', constructor);
			$log.info('Locals', locals);
			$log.info('Arguments', arguments);
			console.groupEnd();

			return ctrl;
		};
	};

	angular.module('controllerServiceDecorator', ['ng'], ['$provide', function ($provide) {
		$provide.decorator('$controller', ['$delegate', '$log', controllerServiceDecoratorFunc]);
	}]);

})();
