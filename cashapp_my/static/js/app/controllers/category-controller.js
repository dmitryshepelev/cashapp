(function (angular) {

    function CategoryCtrl ($scope, $rootScope, $q, $ToastrService, $ModalService, $CategoryService, $stateParams, $state, $CommonService) {
        var categoryGuid = $stateParams.guid;
        $scope.isRoot = categoryGuid ? false : true;
        
        $scope.category = {
            subs: null
        };
        
        /**
         * Error callback
         * @param response
         */
        function onError(response) {
            $ToastrService.messageFromResponse(response);
        }

        $scope.up = function (toRoot) {
            var options = { reload: true };
            if ($scope.category.parent_guid && !toRoot) {
                $state.go('my.category.details', { guid: $scope.category.parent_guid }, options)
            } else {
                $state.go('my.category', {}, options)
            }
        };

        /**
         * Opens manage PO modal
         * @private
         */
        $scope.manage = function($event, guid) {
            $event.stopImmediatePropagation();
            if (!guid) {
                $ToastrService.error();
            } else {
                var state = 'my.category.' + ($scope.isRoot ? '' : 'details.') + 'action';
                $state.go(state, { action: 'edit', subguid: guid });
            }
        };

        /**
         * Go to category details
         * @param $event
         * @param guid
         */
        $scope.details = function ($event, guid) {
            $event.stopImmediatePropagation();
            if (!guid) {
                $ToastrService.error();
            } else {
                $state.go('my.category.details', {guid: guid});
            }
        };
        
        /**
         * Init $scope with default values
         */
        function initScope(data) {

            /**
             * Init $scope.category
             * @param category
             */
            function initCategory(category) {
                $scope.category = category;
            }

            data.forEach(function (item) {
                if (item.data.hasOwnProperty('category')) {
                    initCategory(item.data.category)
                }
            });
            
            $rootScope.$on('Category.addSuccess', function (event, category) {
                if (!angular.isArray($scope.category.subs)) {
                    $scope.category.subs = [];
                }
                $scope.category.subs.push(category);
            });

            $rootScope.$on('Category.editSuccess', function (event, category) {
                var index = $CommonService.getIndexByField($scope.category.subs, category.guid);
                if (index >= 0) {
                    $scope.category.subs[index] = category;
                }
            })
        }

        /**
         * Loads initial data values
         */
        function loadInitialData() {
            $q
                .all([
                    $CategoryService.getCategory(categoryGuid, { subs: true, parent: true })
                ])
                .then(initScope)
                .catch(onError)
        }
        
        loadInitialData();
    }

    CategoryCtrl.$inject = ['$scope',
        '$rootScope', 
        '$q', 
        '$ToastrService', 
        '$ModalService', 
        '$CategoryService', 
        '$stateParams',
        '$state',
        '$CommonService'
    ];

    angular
        .module('CashAppMy')
        .controller('category-controller', CategoryCtrl)

})(angular);
