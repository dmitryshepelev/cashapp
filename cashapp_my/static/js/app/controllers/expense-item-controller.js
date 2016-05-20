(function (angular) {

    function ExpenseItemCtrl ($scope, $ToastrService, $ModalService) {

        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }
    }

    ExpenseItemCtrl.$inject = ['$scope', '$ToastrService', '$ModalService'];

    angular
        .module('CashAppMy')
        .controller('expense-item-controller', ExpenseItemCtrl)

})(angular);
