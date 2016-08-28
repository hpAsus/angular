// Feedback Controller
// =====================================================================================================================
(function () {

	angular.module('app.feedback').config(['$provide', function ($provide) {
		$provide.decorator('emailService', ['$delegate', '$q', function emailServiceDecorator($delegate, $q) {

			var SEND = $delegate.SEND;
			$delegate._mail.signature = '';

			console.log($delegate._mail);

			$delegate.setContent = function (content) {
				var deferred = $q.defer();
				console.log('Setting Content');
				$delegate._mail.content = content;
				// deferred.resolve($delegate._mail.content);
				deferred.resolve($delegate._mail);
				return deferred.promise;

				// $delegate._mail.content = content;
			};

			$delegate.setFrom = function (from) {
				var deferred = $q.defer();
				console.log('Setting From');
				$delegate._mail.from = from;
				// deferred.resolve($delegate._mail.from);
				deferred.resolve($delegate._mail);
				return deferred.promise;

				// $delegate._mail.from = from;
			};

			$delegate.setTo = function (to) {
				var deferred = $q.defer();
				console.log('Setting To');
				$delegate._mail.to = to;
				deferred.resolve($delegate._mail);
				// deferred.resolve($delegate._mail.to);
				return deferred.promise;

				// $delegate._mail.to = to;
			};

			$delegate.setSignature = function (signature) {
				var deferred = $q.defer();
				console.log('Setting Signature');
				$delegate._mail.signature = signature;
				deferred.resolve($delegate._mail);
				// deferred.resolve($delegate._mail.signature);
				return deferred.promise;

				// $delegate._mail.signature = signature;
			};

			// Should extend original SEND method
			$delegate.sendFromDecorator = function (from, to, signature) {
				var deferred = $q.defer();
				deferred.resolve($delegate._mail);
				return deferred.promise;
			};

			return $delegate;
		}]);
	}]);

})();