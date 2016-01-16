(function (angular) {
    function SignUpCtrl($scope, $validator, $AuthService, $window) {
        /**
         * Callback to execute when signup is succeed
         * @param data server data
         */
        function onSignUpSuccess (data) {
            $window.location.href = (data && data.redirect_url) ? data.redirect_url : '/';
        }

        /**
         * Callback to execute when signup isn't succeed
         */
        function onSignUpError (response) {
            if (response.data && response.data instanceof Object && !Array.isArray(response.data)) {
                $validator.showErrors(response.data);
            }
        }

        $scope.signupModel = {
            data: {
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            },
            signup: function () {
                var result = $validator.validateForm($scope.signupModel.form);

                if (result.status) {
                    $AuthService.signup(this.data)
                        .success(onSignUpSuccess)
                        .error(onSignUpError)
                        .then()
                }
            }
        }
    }

    SignUpCtrl.$inject = ['$scope', '$validator', '$AuthService', '$window'];

    angular
        .module('CashAppAuth')
        .controller('signup-controller', SignUpCtrl)

})(angular);
