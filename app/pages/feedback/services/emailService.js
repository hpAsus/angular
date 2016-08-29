// Email Service
// =====================================================================================================================
(function () {

	var emailServiceFunc = function ($q, CONST) {

		// SEND method
		this.SEND = function (from, to = CONST.FEEDBACK_EMAIL, content) {
			var deferred = $q.defer();

			if (from && content) {
				var email = from + ' ' + to + ' ' + content;
				deferred.resolve(email);
			} else {
				deferred.reject('Not enough data');
			}
			return deferred.promise;
		};
	};
	angular.module('app.feedback').service('emailService', ['$q', 'CONST', emailServiceFunc]);

})();