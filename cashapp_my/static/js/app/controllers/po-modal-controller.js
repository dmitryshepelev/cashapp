(function (angular) {

    /**
     * Controller function
     * @param $scope
     * @param $uibModalInstance
     * @param $POService
     * @param $ToastrService
     * @param $WidgetService
     * @param PaymentObjects provider to init data. returns obj of guids { include: [], exclude: [], selected: {} }
     * @constructor
     */
    function POMOdalCtrl ($scope, $uibModalInstance, $POService, $ToastrService, $WidgetService, PaymentObjects) {
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
            $uibModalInstance.close(po)
        }

        /**
         * Init $scope from response
         * @param response
         */
        function initScope (response) {
            var po = response.data.po;

            if (PaymentObjects.exclude) {
                po = po.filter(function (item) {
                    return PaymentObjects.exclude.indexOf(item.guid) === -1;
                });
            } else if (PaymentObjects.include) {
                po = po.filter(function (item) {
                    return PaymentObjects.include.indexOf(item.guid) !== -1;
                });
            } else {}

            var selected = PaymentObjects.selected ? po.filter(function (item) {
                return item.guid = PaymentObjects.selected
            }) : [];

            $scope.poModel = {
                /**
                 * All PO
                 */
                objects: po,

                /**
                 * Selected PO
                 */
                selected: selected.length === 0 ? undefined: selected[0],

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

    POMOdalCtrl.$inject = ['$scope', '$uibModalInstance', '$POService', '$ToastrService', '$WidgetService', 'PaymentObjects'];

    angular
        .module('CashAppMy')
        .controller('po-modal-controller', POMOdalCtrl)

})(angular);