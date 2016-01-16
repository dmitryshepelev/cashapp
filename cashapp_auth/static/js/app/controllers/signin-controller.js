(function (angular) {
    function SignInCtrl($scope, $validator, $AuthService) {
        /**
         * Callback to execute when signin request is completed
         * @param response server data
         */
        function onSignInCompleted (response) {
            console.log('then', response);
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

    SignInCtrl.$inject = ['$scope', '$validator', '$AuthService'];

    angular
        .module('CashAppAuth')
        .controller('signin-controller', SignInCtrl)

})(angular);
