// Feedback Controller
// =====================================================================================================================
(function () {

	var emailServiceDecorator = function ($delegate, $q) {

		var originalSEND = $delegate.SEND;

		var newToArray = ['second@angularproject.com'];
		newToArray.push($delegate._mail.to);
		$delegate._mail.to = [];
		$delegate._mail.signature = '';


		$delegate.setContent = function (content) {
			$delegate._mail.content = content;
		};

		$delegate.setFrom = function (from) {
			$delegate._mail.from = from;
		};

		$delegate.setTo = function (to) {
			$delegate._mail.to.push(to);
		};

		$delegate.setSignature = function (signature) {
			$delegate._mail.signature = signature;
		};


		// Should extend original SEND method
		$delegate.sendFromDecorator = function (from = '', to = [], signature = '') {
			// console.log(arguments);
			//
			// $delegate.setFrom(arguments[0]);
			// $delegate.setTo(arguments[1]);
			// $delegate.setTo(to);
			// $delegate.setContent(arguments[2]);
			// $delegate.setSignature(signature);

			console.log($delegate._mail);

			// console.log('originalSEND', originalSEND);

			var deferred = $q.defer();
			deferred.resolve($delegate._mail);
			return deferred.promise;
		};

		$delegate.SEND = function () {
			// var deferred = $q.defer();

			$delegate.setFrom(arguments[0]);
			$delegate.setTo(arguments[1]);
			$delegate.setContent(arguments[2]);

			// deferred.resolve();

			return $delegate.sendFromDecorator($delegate._mail.from, $delegate._mail.to[0], $delegate._mail.signature);
			// return deferred.promise;
		};

		return $delegate;
	};

	angular.module('app.feedback').config(['$provide', function ($provide) {
		$provide.decorator('emailService', ['$delegate', '$q', emailServiceDecorator]);
	}]);

})();