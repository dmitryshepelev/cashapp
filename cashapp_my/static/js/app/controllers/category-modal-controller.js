(function (angular) {

    function CategoryModalCtrl ($scope, $rootScope, $q, $CommonService, $ToastrService, $uibModalInstance, $stateParams, $validator) {

        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }
    }

    CategoryModalCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$q',
        '$CommonService',
        '$ToastrService',
        '$uibModalInstance',
        '$stateParams',
        '$validator'
    ];

    angular
        .module('CashAppMy')
        .controller('category-modal-controller', CategoryModalCtrl)

})(angular);
