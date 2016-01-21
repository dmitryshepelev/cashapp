(function (angular) {
    function LangSrv (localStorageService) {
        var languages = [
            { title: 'English', key: 'en' },
            { title: 'Русский', key: 'ru' }
        ];

        return {
            /**
             * Get languages array
             * @returns {{title: string, key: string}[]}
             */
            getLanguages: function () {
                return languages;
            },
            /**
             * Return lang object from $scope.languages array by key
             * @param key
             * @returns {object}
             */
            getLanguageByKey: function (key) {
                var language = languages.filter(function (item) {
                    return item.key === key;
                });
                return language[0]
            },
            /**
             * Get current lang key
             * @returns language object
             */
            getCurrentLang: function () {
                var key = localStorageService.get('lang') || 'en';
                return this.getLanguageByKey(key)
            },
            /**
             * Set current lang
             * @param langKey object
             */
            setCurrentLang: function (langKey) {
                localStorageService.set('lang', langKey);
            }
        }
    }

    LangSrv.$inject = ['localStorageService'];

    angular
        .module('CashApp.Service')
        .factory('$LangService', LangSrv);

})(angular);
