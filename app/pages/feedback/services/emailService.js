// Email Service
// =====================================================================================================================
(function () {

	var emailServiceFunc = function ($q, CONST) {

		// SEND method
		this.SEND = function (from, to = CONST.FEEDBACK_EMAIL, content) {
			var deferred = $q.defer();

			if (to === 'support_2@mail.ru') {
				var email = from + '\n' + to + '\n' + content;
				setTimeout(() => {
					deferred.resolve(email);
				}, 1000);

			} else {
				deferred.reject('no-no-no');
			}

			// if (from && content) {
			// 	var email = from + '\n' + to + '\n' + content;
			// 	setTimeout(() => {
			// 		deferred.resolve(email);
			// 	}, 1000);
			// } else {
			// 	setTimeout(() => {
			// 		deferred.reject('Not enough data');
			// 	}, 1000);
			//
			// }
			return deferred.promise;
		};
	};
	angular.module('app.feedback').service('emailService', ['$q', 'CONST', emailServiceFunc]);

})();