// Email Service
// =====================================================================================================================
(function () {

	var emailServiceFunc = function ($q, CONST) {

		this._mail = {
			from: '',
			to: CONST.FEEDBACK_EMAIL,
			content: ''
		};

		// SEND method
		this.SEND = function (from, to, content) {
			var deferred = $q.defer();
			if (from && content) {
				this._mail.from = from;
				this._mail.to = to;
				this._mail.content = content;

				var email = this._mail;

				deferred.resolve(email);
			} else {
				deferred.reject('Not enough data');
			}

			return deferred.promise;

		};

	};

	angular.module('app.feedback').service('emailService', ['$q', 'CONST', emailServiceFunc]);

})();