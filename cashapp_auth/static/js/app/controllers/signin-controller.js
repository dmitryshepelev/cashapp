(function (angular) {
    function SignInCtrl($scope, $validator, $AuthService, $window) {
        /**
         * Callback to execute when signin request is completed
         * @param response server data
         */
        function onSignInCompleted (response) {
            $window.location.href = (response.data && response.data.redirect_url) ? response.data.redirect_url : '/';
        }

        /**
         * Callback to execute when signin request failed
         */
        function onSignInError (response) {
            if (response.data && response.data instanceof Object && !Array.isArray(response.data)) {
                $validator.showErrors(response.data);
            }
        }

        $scope.signinModel = {
            data: {
                username: '',
                password: ''
            },
            signin: function () {
                var result = $validator.validateForm($scope.signinModel.form);
                if (result.status) {
                    $AuthService.signin(this.data)
                        .then(onSignInCompleted)
                        .catch(onSignInError);
                }
            }
        }
    }

    SignInCtrl.$inject = ['$scope', '$validator', '$AuthService', '$window'];

    angular
        .module('CashAppAuth')
        .controller('signin-controller', SignInCtrl)

})(angular);
