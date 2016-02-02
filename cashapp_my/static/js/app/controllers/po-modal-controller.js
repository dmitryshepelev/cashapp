(function (angular) {

    function POMOdalCtrl ($scope, $uibModalInstance, $POService, $ToastrService) {
        $scope.poModel = {};

        /**
         * Error callback
         * @param response
         */
        function onError (response) {
            $ToastrService.messageFromResponse(response);
        }

        /**
         * Init $scope from response
         * @param response
         */
        function initScope (response) {
            $scope.poModel = {
                /**
                 * All PO
                 */
                objects: response.data.po,

                /**
                 * Selected PO
                 */
                selected: undefined,

                /**
                 * Resolve selected PO and close modal
                 */
                addPO: function () {
                    if (this.selected) {
                        $uibModalInstance.close(this.selected)
                    } else {
                        $ToastrService.warning('choose_po')
                    }
                }
            }
        }

        $POService.getAll()
            .then(initScope)
            .catch(onError)
    }

    POMOdalCtrl.$inject = ['$scope', '$uibModalInstance', '$POService', '$ToastrService'];

    angular
        .module('CashAppMy')
        .controller('po-modal-controller', POMOdalCtrl)

})(angular);