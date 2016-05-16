procurement.controller('softwareCtrl', function ($scope, $rootScope, $mdDialog, $mdToast, requestService, id){
	// $scope.user = $rootscope.user;
	$scope.editMode = false;

	requestService.getById(id)
		.success(function (software) {
			$scope.software = software;
		});
		
	$scope.hide = function() {
		$mdDialog.hide();
	};
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	
	$scope.canPurchase = function () {
		// TODO
		return true;
	};
	
	$scope.purchaseSoftware = function(ev) {
		var data = {
			unit:			"Sapir",
			sProducerId: 	$scope.software.producerId,
			sPublisherName: $scope.software.publisherName,
			sSoftCon: 		$scope.software.softCon,
			sPlatform: 		$scope.software.platform,
			sLicenceCost: 	$scope.software.licenceCost,
			sType: 			$scope.software.supportCost
		};

		$mdDialog.hide(data);
	};
	
});