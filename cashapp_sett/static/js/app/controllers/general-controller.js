(function (angular) {
    function GeneralCtrl ($scope, $translate, $LangService) {
        /**
         * Init $scope with default values
         */
        function initScope () {
            $scope.languages = $LangService.getLanguages();
            $scope.currentLang = $LangService.getCurrentLang();

            $scope.onLanguageChange = function (lang) {
                $LangService.setCurrentLang(lang.key);
                $scope.currentLang = lang;
                $translate.use(lang.key)
            };
        }

        initScope();
    }

    GeneralCtrl.$inject = ['$scope', '$translate', '$LangService'];

    angular
        .module('CashAppSett')
        .controller('general-controller', GeneralCtrl)

})(angular);