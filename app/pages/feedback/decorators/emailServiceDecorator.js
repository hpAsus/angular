// Feedback Controller
// =====================================================================================================================
(function () {

	var emailServiceDecorator = function ($delegate, $q) {

		var SEND = $delegate.SEND;
		$delegate._mail.signature = '';


		$delegate.setContent = function (content) {
			$delegate._mail.content = content;
		};

		$delegate.setFrom = function (from) {
			$delegate._mail.from = from;
		};

		$delegate.setTo = function (to) {
			$delegate._mail.to = to;
		};

		$delegate.setSignature = function (signature) {
			$delegate._mail.signature = signature;
		};

		// Should extend original SEND method
		$delegate.sendFromDecorator = function (from, to, signature) {
			var deferred = $q.defer();
			deferred.resolve($delegate._mail);
			return deferred.promise;
		};

		return $delegate;
	};

	angular.module('app.feedback').config(['$provide', function ($provide) {
		$provide.decorator('emailService', ['$delegate', '$q', emailServiceDecorator]);
	}]);

})();