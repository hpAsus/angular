// Feedback Controller
// =====================================================================================================================
(function () {

	var emailServiceDecorator = function ($delegate, $q) {
		var self = $delegate;
		var originalSEND = $delegate.SEND;

		var _mail = {
			from: null,
			to: [],
			content: null,
			signature: null
		};

		// Set Content
		$delegate.setContent = function (content) {
			_mail.content = content;
		};

		// Set From
		$delegate.setFrom = function (fromEmail) {
			_mail.from = fromEmail;
		};

		// Set To
		$delegate.setTo = function (to) {
			_mail.to = to;
		};

		// Set Signature
		$delegate.setSignature = function (signature) {
			_mail.signature = signature;
		};


		// Send from decorator method
		$delegate.sendFromDecorator = function (from, to, signature) {
			var deferred = $q.defer();
			var index = 0;

			//
			$delegate.setFrom(arguments[0]);
			$delegate.setTo(arguments[1]);
			$delegate.setSignature(signature);

			let p = $q.resolve();

			var action = function (i) {
				return function () {
					return $q(function (resolve, reject) {
						originalSEND(_mail.from, i, _mail.content+_mail.signature).then(function (data) {
							console.log(i);
							console.log(data);
							console.log('\n\n');
							resolve(data);
						}).catch(function (err) {
							console.log(err);
							reject(err);
						});
					});
				}
			};

			for (let i of _mail.to) {
				p = p.then(action(i)).catch(action(i));
			}

			return deferred.promise;
		};


		return $delegate;
	};

	angular.module('app.feedbackDecorated').config(['$provide', function ($provide) {
		$provide.decorator('emailService', ['$delegate', '$q', emailServiceDecorator]);
	}]);

})();