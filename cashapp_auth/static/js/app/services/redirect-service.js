(function (angular) {

    function _redirectSrv ($window) {
        return {
            /**
             * Returns redirect url if exist
             */
            getRedirectUrl: function () {
                return angular.element(document.querySelector('#redirect_url')).val()
            },
            /**
             * Redirect to url
             * @param url
             */
            redirectToUrl: function (url) {
                $window.location.href = url || this.getRedirectUrl() || '/';
            }
        }
    }

    _redirectSrv.$inject = ['$window'];

    angular
        .module('CashAppAuth')
        .factory('$RedirectService', _redirectSrv)

})(angular);
