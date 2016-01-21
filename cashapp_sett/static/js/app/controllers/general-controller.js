(function (angular) {
    function GeneralCtrl ($scope, $translate, $LangService, localStorageService) {
        /**
         * Set lang value to $scope currentLang
         * @param lang
         */
        function initCurrentLang (lang) {
            $scope.currentLang = lang;
        }

        /**
         * Init $scope with default values
         */
        function initScope () {
            $scope.languages = $LangService.getLanguages();

            $scope.onLanguageChange = function (lang) {
                $LangService.setCurrentLang(lang, function (lang) {
                    initCurrentLang(lang);
                    $translate.use(lang.key)
                });
            };

            $LangService.getCurrentLang(initCurrentLang);
        }

        initScope();
    }

    GeneralCtrl.$inject = ['$scope', '$translate', '$LangService', 'localStorageService'];

    angular
        .module('CashAppSett')
        .controller('general-controller', GeneralCtrl)

})(angular);
