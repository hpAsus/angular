// Edit Profile Controller
// =====================================================================================================================

(function () {

    var profileEditCtrlFunc = function (CONST_VALIDATORS, $scope, $http, $httpParamSerializerJQLike, $state, $mdToast, userData) {

        this.user = angular.fromJson(userData);

        console.log(this.user);

        //Sending some constants to view
        this.nameMaxWords = CONST_VALIDATORS.MAX_WORDS_IN_NAME;
        this.minAge = CONST_VALIDATORS.AGE_MINIMUM;
        this.maxAge = CONST_VALIDATORS.AGE_MAXIMUM;

        //Profile Update form
        this.submitProfileUpdateForm = function() {

            //console.log(this.user);
            //console.log(angular.toJson(this.user));
            //console.log($httpParamSerializerJQLike(angular.toJson(this.user)));

            $http({
                method: 'PUT',
                url: 'api/users/' + this.user.email,
                data: $httpParamSerializerJQLike(this.user),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {

                console.log('success! ', data);
                $state.go('viewProfile');

            }).error(function (err) {
                console.log('error! ', err);
            });

        }
    };

    angular.module('app.profile').controller('profileEditCtrl', ['CONST_VALIDATORS', '$scope', '$http', '$httpParamSerializerJQLike', '$state', '$mdToast', 'userData', profileEditCtrlFunc]);

})();

