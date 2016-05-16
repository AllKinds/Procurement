
temp_Reuests =[
	['a','a','a','a','a','a'],
	['b','b','b','b','b','c'],
	['c','c','c','c','d','e'],
	['a','d','d','d','d','e'],
	['a','e','e','e','f','a'],
	['f','f','f','e','f','a'],
]

procurement.controller('mainCtrl', function ($scope, $rootScope, $mdDialog, $filter, $mdToast, $routeParams, requestService){
	$scope.firstload = $scope.$parent.firstLoad;
	$scope.tableStartIndex = 0;
	$scope.tableEndIndex = 10;

	$scope.nextPage = function() {
		$scope.tableStartIndex += 10;
		$scope.tableEndIndex += 10;
	};

	$scope.prevPage = function() {
		$scope.tableStartIndex -= 10;
		$scope.tableEndIndex -= 10;
	};

	$scope.limitList = function (index) {
		return (index >= $scope.tableStartIndex && index <= $scope.tableEndIndex);
	}

	$scope.uiRequests = temp_Reuests; 
	
	$scope.applyFilter = function() {
		if ($scope.searchTerm.length > 0) {
			$scope.tableStartIndex = 0;
			$scope.tableEndIndex = 10;
		}
		$scope.resetFilter();
		$scope.uiRequests = $filter('filter')($scope.uiRequests, $scope.searchTerm);
	};
	
	$scope.resetFilter = function() {
		//$scope.uiRequests = $scope.requests;
		$scope.uiRequests = $scope.softwares	;
		$scope.uiRequests = $filter('filter')($scope.uiRequests, $scope.wantedList);
	};
	
	// $scope.sortType = 'name';
	// $scope.sortReverse = false;
	// $scope.searchTerm = '';	
	
	requestService.get()
		.then(function (softwares) {
			$scope.firstLoad = $scope.$parent.firstLoad = false;
			$scope.softwares = softwares;
			$scope.resetFilter();
		});
	
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
				requestService.createSoftware(data).success(function (request) {
					$mdToast.show(
						$mdToast.simple()
							.content('הבקשה נשמרה')
							.position('bottom right')
							.hideDelay(3000)
					);
					// socket.emit
				}).error(function (err) {
					$mdToast.show(
						$mdToast.simple()
							.content(err)
							.position('bottom right')
							.hideDelay(3000)
						);
				});
			}, function(){
				// Canceled
			});
	};
	
	$scope.showSoftwareDetails = function (ev) {
		$mdDialog.show({
			controller: 'softwareCtrl',
			resolve: {
				id: function () {
					return ev.currentTarget.id;
				}
			},
			templateUrl: 'partials/dialogs/software-details-dialog.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true
		})
			.then(function (data) {
			// Submited
				requestService.createPurchase(data).success(function (request) {
					$mdToast.show(
						$mdToast.simple()
							.content('הרכישה התבצעה')
							.position('bottom right')
							.hideDelay(3000)
					);
					// socket.emit
				}).error(function (err) {
					$mdToast.show(
						$mdToast.simple()
							.content(err)
							.position('bottom right')
							.hideDelay(3000)
						);
				});
			}, function(){
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
	
	$scope.submitNewSoftware = function () {
		var data = {
			// catNoSapir: 	$scope.newSoftware.catNoSapir,
			producerId: 	$scope.newSoftware.producerId ,
			// catNoTltn: 		$scope.newSoftware.catNoTltn ,
			publisherName: 		$scope.newSoftware.publisherName,
			softCon: 		$scope.newSoftware.softCon ,
			// productGroup: 	$scope.newSoftware.productGroup ,
			platform: 		$scope.newSoftware.platform ,
			// intelNeed: 		$scope.newSoftware.intelNeed ,
			licenceCost: 	$scope.newSoftware.licenceCost ,
			supportCost: 	$scope.newSoftware.supportCost ,
			type: 			$scope.newSoftware.type 
		};
		
		$mdDialog.hide(data)
	};
}
