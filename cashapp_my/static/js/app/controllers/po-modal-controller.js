(function (angular) {

    function POMOdalCtrl ($scope, $uibModalInstance, $POService, $ToastrService, $WidgetService) {
        $scope.poModel = {};

        /**
         * Error callback
         * @param response
         */
        function onError (response) {
            $ToastrService.messageFromResponse(response);
        }

        /**
         * Creation success callback
         * @param response
         */
        function onCreateWidgetSuccess(response) {
            var po = response.data.widget;
            console.log(po);
            $uibModalInstance.close(po)
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
                        $WidgetService.create({type: 'paymentobject', guid: this.selected.guid})
                            .then(onCreateWidgetSuccess)
                            .catch(onError)
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

    POMOdalCtrl.$inject = ['$scope', '$uibModalInstance', '$POService', '$ToastrService', '$WidgetService'];

    angular
        .module('CashAppMy')
        .controller('po-modal-controller', POMOdalCtrl)

})(angular);