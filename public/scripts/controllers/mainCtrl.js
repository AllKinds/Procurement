
temp_Reuests =[
	['a','a','a','a','a','a'],
	['a','a','a','a','a','a'],
	['a','a','a','a','a','a'],
	['a','a','a','a','a','a'],
	['a','a','a','a','a','a'],
	['a','a','a','a','a','a'],
]

procurement.controller('mainCtrl', function ($scope, $rootScope, $mdDialog, $filter, $mdToast, $routeParams){
	$scope.tableStartIndex = 0;
	$scope.tableEndIndex = 50;

	$scope.nextPage = function() {
		$scope.tableStartIndex += 50;
		$scope.tableEndIndex += 50;
	};

	$scope.prevPage = function() {
		$scope.tableStartIndex -= 50;
		$scope.tableEndIndex -= 50;
	};

	$scope.limitList = function (index) {
		return (index >= $scope.tableStartIndex && index <= $scope.tableEndIndex);
	}

	$scope.uiRequests = temp_Reuests; 
	
	$scope.applyFilter = function() {
		if ($scope.searchTerm.length > 0) {
			$scope.tableStartIndex = 0;
			$scope.tableEndIndex = 50;
		}
		$scope.resetFilter();
		$scope.uiRequests = $filter('filter')($scope.uiRequests, $scope.searchTerm);
	};
	
	$scope.resetFilter = function() {
		//$scope.uiRequests = $scope.requests;
		$scope.uiRequests = temp_Reuests	;
		$scope.uiRequests = $filter('filter')($scope.uiRequests, $scope.wantedList);
	};
	
	// $scope.sortType = 'name';
	// $scope.sortReverse = false;
	// $scope.searchTerm = '';	
	
	$scope.showAdvanced = function (ev) {
		$mdDialog.show({
			controller: DialogCtrl,
			templateUrl: 'partials/dialogs/new-software-dialog.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: false
		})
			.then(function (data) {
			// Submited
				requestService.create(data).success(function (request) {
					$mdToast.show(
						$mdToast.simple()
							.content('הבקשה נשמרה')
							.position('bottom right')
							.hideDelat(3000)
					);
					// socket.emit
				}).error(function (err) {
					$mdToast.show(
						$mdToast.simple()
							.content(err)
							.position('bottom right')
							.hideDelat(3000)
						);
				});
			}, function(){
				// Canceled
			});
	};
	
	$scope.showRequestDetails = function (ev) {
		$mdDialog.show({
			controller: 'requestCtrl',
			resolve: {
				id: function () {
					return ev.currentTarget.id;
				}
			},
			templateUrl: 'partials/dialogs/request-details-dialog.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true
		})
			.then(function (data) {
				// Applied
			}, function () {
				// Canceled
			});
	};
	
});

function DialogCtrl($scope, $mdDialog) {
	$scope.hide = function () {
		$mdDialog.hide();
	};
	$scope.cancel = function () {
		$mdDialog.cancel();
	};
	
	$scope.submitDisable = true;
	$scope.reqestFieldsStatus = 0;
	
	// $scope.$watch
	
	$scope.reqest = function () {
		var data = {
			// req data
		};
		
		$mdDialog.hide(data)
	};
}
