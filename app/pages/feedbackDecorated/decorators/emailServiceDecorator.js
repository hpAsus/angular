// Feedback Controller
// =====================================================================================================================
(function () {

	var emailServiceDecorator = function ($delegate, $q) {
		var self = $delegate;

		$delegate._mail = {
			from: null,
			to: [],
			content: null,
			signature: null
		};


		// Set Content
		$delegate.setContent = function (content) {
			$delegate._mail.content = content;
			return self;
		};

		// Set From
		$delegate.setFrom = function (from) {
			$delegate._mail.from = from;
			return self;
		};

		// Set To
		$delegate.setTo = function (to) {
			$delegate._mail.to.push(to);

			return self;
		};

		// Set Signature
		$delegate.setSignature = function (signature) {
			$delegate._mail.signature = signature;

			return self;
		};


		// Send from decorator method
		$delegate.sendFromDecorator = function (from = $delegate._mail.from, to = $delegate._mail.to, signature = $delegate._mail.signature) {
			
			//
			$delegate.setFrom(arguments[0]);
			$delegate.setTo(arguments[1]);
			$delegate.setSignature(signature);

			console.log($delegate._mail);

			var deferred = $q.defer();
			deferred.resolve($delegate._mail);
			return deferred.promise;
		};


		return $delegate;
	};

	angular.module('app.feedbackDecorated').config(['$provide', function ($provide) {
		$provide.decorator('emailService', ['$delegate', '$q', emailServiceDecorator]);
	}]);

})();