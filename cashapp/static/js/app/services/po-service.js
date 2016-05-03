(function (angular) {
    function POSrv ($http) {
        var baseUrl = '/api/cmn/po/';
        var _tempPO = {};
        return {
            tempPO: function (po) {
                if (po) {
                    _tempPO = po;
                } else {
                    return _tempPO;
                }
            },
            /**
             * Save PO data
             * @param po
             * @returns {*}
             */
            addPO: function (po) {
                return $http.post(baseUrl, po);
            },
            /**
             * Edit PO
             * @param po
             * @returns {*}
             */
            editPO: function (po) {
                return $http.put(baseUrl, po)
            },
            /**
             * Get PO by type
             * @param type
             */
            getByType: function (type) {
                var params = type + '/';
                return $http.get(baseUrl + params);
            },
            /**
             * Get PO by its guid
             */
            getPO: function (guid) {
                var params = guid + '/';
                return $http.get(baseUrl + params)
            },
            /**
             * Get all PO
             * @returns {*}
             */
            getAll: function () {
                return $http.get(baseUrl)
            }
        }
    }

    POSrv.$inject = ['$http'];

    angular
        .module('CashApp.Service')
        .factory('$POService', POSrv)

})(angular);

