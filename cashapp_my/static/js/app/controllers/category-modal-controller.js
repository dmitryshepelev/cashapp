(function (angular) {

    function CategoryModalCtrl ($scope, $rootScope, $q, $CommonService, $ToastrService, $uibModalInstance, $stateParams, $validator, $CategoryService) {
        var action = $stateParams.action;
        $scope.isEditMode = action === 'edit';
        
        $scope.parent = {};
        $scope.category = {};

        /**
         * Callback to execute on manage error
         */
        function onManageCategoryError(response) {
            try {
                $validator.validateFormResponse(response);
            } catch (e) {
                $ToastrService.messageFromResponse(response)
            }
        }

        /**
         * Callback to execute on manage success
         */
        function onManageCategorySuccess(response) {
            var category = response.data.category;
            $rootScope.$broadcast('Category.' + action + 'Success', category);
            $uibModalInstance.close();
        }

        /**
         * Manage category
         */
        $scope.manageCategory = function () {
            var action = $stateParams.action;

            var validationResult = $validator.validateForm($scope.categoryForm);
            if (validationResult.status) {
                
                var category = {
                    name: $scope.category.name,
                    guid: $scope.category.guid,
                    parent_guid: $stateParams.guid
                };

                $CategoryService[action](category)
                    .then(onManageCategorySuccess)
                    .catch(onManageCategoryError)
            }
        };

        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }

        /**
         * Init category
         * @param response
         */
        function initCategory(response) {
            $scope.category = response.data.category;
        }

        /**
         * Init $scope with default values
         */
        function initScope(response) {

            if ($stateParams.subguid) {
                $CategoryService
                    .getCategory($stateParams.subguid)
                        .then(initCategory)
                        .catch(onError)
            }
        }

        /**
         * Loads initial data values
         */
        function loadInitialData() {
            $q
                .all([

                ])
                .then(initScope)
                .catch(onError)
        }
        
        loadInitialData();
    }

    CategoryModalCtrl.$inject = [
        '$scope',
        '$rootScope',
        '$q',
        '$CommonService',
        '$ToastrService',
        '$uibModalInstance',
        '$stateParams',
        '$validator',
        '$CategoryService'
    ];

    angular
        .module('CashAppMy')
        .controller('category-modal-controller', CategoryModalCtrl)

})(angular);
