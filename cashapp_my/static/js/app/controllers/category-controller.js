(function (angular) {

    function CategoryCtrl ($scope, $ToastrService, $ModalService, $PORegisterService) {

        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }
    }

    CategoryCtrl.$inject = ['$scope', '$ToastrService', '$ModalService', '$PORegisterService'];

    angular
        .module('CashAppMy')
        .controller('category-controller', CategoryCtrl)

})(angular);
