// Startup Time Provide
// =====================================================================================================================

(function () {

	var startupAppTimeFunc = function startupAppTimeProvider() {
		var now =  moment();
		var dateFormat = 'DD MMMM YYYY, HH:mm:ss, dddd';

		return {
			setDateFormat: function(format) {
				dateFormat = format;
			},
			$get: function () {

				function getAppStartupTime() {
					return now.format(dateFormat);
				}

				return {
					getAppStartupTime: getAppStartupTime
				}
			}
		};
	};

	angular.module('app').provider('startupAppTime', [startupAppTimeFunc]);

})();
