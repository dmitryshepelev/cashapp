(function (angular) {
    function AuthService ($http) {
        var baseUrl = '/auth/api/';
        return {
            /**
             * Service method to signup new user
             * @param model new user model
             * @returns Promise
             */
            signup: function (model) {
                var method = 'signup/';
                return $http.post(baseUrl + method, model)
            }
        }
    }

    AuthService.$inject = ['$http'];

    angular
        .module('CashAppAuth')
        .factory('$AuthService', AuthService)

})(angular);
