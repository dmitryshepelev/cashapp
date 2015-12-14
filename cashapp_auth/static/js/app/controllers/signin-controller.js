(function (angular) {
    function SignInCtrl($scope, $validator) {
        $scope.signinModel = {
            data: {
                username: '',
                password: ''
            },
            signin: function () {
                var result = $validator.validateForm($scope.signinModel.form);
            }
        }
    }

    SignInCtrl.$inject = ['$scope', '$validator', '$http'];

    angular
        .module('CashAppAuth')
        .controller('signin-controller', SignInCtrl)

})(angular);
