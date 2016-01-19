(function (angular) {
    function SignUpCtrl($scope, $validator, $AuthService, $window) {
        /**
         * Callback to execute when signup is succeed
         * @param response server data
         */
        function onSignUpSuccess (response) {
            $window.location.href = (response.data && response.data.redirect_url) ? response.data.redirect_url : '/';
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
                        .then(onSignUpSuccess)
                        .catch(onSignUpError)
                }
            }
        }
    }

    SignUpCtrl.$inject = ['$scope', '$validator', '$AuthService', '$window'];

    angular
        .module('CashAppAuth')
        .controller('signup-controller', SignUpCtrl)

})(angular);
