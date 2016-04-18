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

	$scope.applyFilter = function() {
		//TODO
	};
	
	$scope.resetFilter = function() {
		//TODO
	};
	
	// $scope.sortType = 'name';
	// $scope.sortReverse = false;
	// $scope.searchTerm = '';	
	
	$scope.showAdvanced = function (ev) {
		$mdDialog.show({
			controller: DialogCtrl,
			templateUrl: 'partials/dialogs/new-request-dialog.html',
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
