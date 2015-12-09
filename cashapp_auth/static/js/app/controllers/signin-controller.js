(function (angular) {
    function SignInCtrl($scope, $validator) {
        $scope.loginModel = {
            data: {
                username: '',
                password: ''
            },
            signin: function () {
                var result = $validator.validateForm($scope.loginModel.form);
            }
        }
    }

    SignInCtrl.$inject = ['$scope', '$validator', '$http'];

    angular
        .module('CashAppAuth')
        .controller('signin-controller', SignInCtrl)

})(angular);
