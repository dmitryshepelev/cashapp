(function (angular) {
    function LangSrv ($http, localStorageService) {

        var baseUrl = '/sett/api/lang/';
        var languages = [
            { title: 'English', key: 'en' },
            { title: 'Русский', key: 'ru' }
        ];

        /**
         * Get language success callback
         * @param response
         */
        function onGetLanguageSuccess (response) {
            return this.getLanguageByKey(response.data.key)
        }

        /**
         * Get language error callback
         * @param response
         */
        function onGetLanguageError (response) {
            console.log(response);
        }

        /**
         * Set language success callback
         * @param response
         */
        function onSetLanguageSuccess (response) {
            localStorageService.set('lang', response.data.key);
            return this.getLanguageByKey(response.data.key)
        }

        /**
         * Set language error callback
         * @param response
         */
        function onSetLanguageError (response) {
            console.log(response);
        }

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
             * @returns Promise
             */
            getCurrentLang: function (onSuccess) {
                $http.get(baseUrl)
                    .then(onGetLanguageSuccess.bind(this))
                    .then(onSuccess)
                    .catch(onGetLanguageError)
            },
            /**
             * Set current lang
             * @param lang object
             * @param onSuccess callback
             * @returns Promise
             */
            setCurrentLang: function (lang, onSuccess) {
                $http.post(baseUrl, lang)
                    .then(onSetLanguageSuccess.bind(this))
                    .then(onSuccess)
                    .catch(onSetLanguageError)
            }
        }
    }

    LangSrv.$inject = ['$http', 'localStorageService'];

    angular
        .module('CashApp.Service')
        .factory('$LangService', LangSrv);

})(angular);
