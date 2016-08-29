// Feedback Controller
// =====================================================================================================================
(function () {

	var emailServiceDecorator = function ($delegate, $q) {

		var originalSEND = $delegate.SEND;

		var newToArray = [];
		newToArray.push($delegate._mail.to);
		$delegate._mail.to = newToArray;
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
		$delegate.SEND = function (from, to, signature) {
			console.log('originalSEND', originalSEND);
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