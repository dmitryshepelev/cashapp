(function (angular) {
    /**
     * Title directive controller
     * @param $rootScope
     * @param $timeout
     * @param $translate
     * @returns {{link: Function}}
     */
    function PageTitle ($rootScope, $timeout, $translate) {
        return {
            link: function () {
                function _listener (event, toState) {
                    $timeout(function () {
                        var title = (toState.data && toState.data.title) ? toState.data.title : 'default_title';
                        $translate(title)
                            .then(function (title) {
                                $rootScope.title = title;
                            })
                    })
                }

                $rootScope.$on('$stateChangeSuccess', _listener)
            }
        }
    }

    PageTitle.inject = ['$rootScope', '$timeout', '$translate'];

    angular
        .module('CashApp.Service')
        .directive('title', PageTitle)

})(angular);
