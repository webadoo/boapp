var app = angular.module('boapp');

app.controller('CustomersController', ['$scope', '$modal', 'CustomersService', 'CustomerService', function($scope, $modal, CustomersService, CustomerService) {
	 this.vm = {
	 	search: '',
	 };
	 
	 this.getCustomers = function() {
		console.log('customerController.getCustomers()');
		CustomersService.query({ where: $scope.where, order: 'name' }).$promise.then(function(result) {
 			$scope.customers = result.results;
            console.log($scope.customers);
		});
	 };
	 
	 this.addCustomer = function() {
		 console.log('customerController.addCustomer()');
		 var modalInstance = $modal.open({
          	templateUrl: 'views/modal_customer.html',
          	controller: 'AddCustomerModalInstanceController as modal'
       	 });
       
       	 modalInstance.result.then(function(customer) {
          	console.log(customer);
          	CustomersService.create(customer); 
       	 });
	 }
	 
	 this.editCustomer = function(customer) {
		 console.log('customerController.editCustomer(): id:' + customer);
	 }
}]);


app.controller('AddCustomerModalInstanceController', function($modalInstance) {
	var self = this;
	self.vm = {
		title: "Klant toevoegen",
		customer: {},
	}
	
	this.ok = function() {
		console.log('AddCustomerModalInstanceController.ok()');
		$modalInstance.close(self.vm.customer);
	}
	
	this.cancel = function() {
		console.log('AddCustomerModalInstanceController.cancel()');
		$modalInstance.dismiss('cancel');
	};
});

app.controller('EditCustomerModalInstanceController', function($modalInstance) {
	var self = this;
	self.vm = {
		title: "Klant aanpassen",
		customer: {}
	}
	
	self.ok = function() {
		console.log('EditCustomerModalInstanceController.ok()');
	};
	
	self.cancel = function() {
		
	}
});
// function EditCustomerModalInstanceController ($scope, $modalInstance, customer) {
//     $scope.title = "Klant aanpassen";
//     $scope.customer = customer;
//     $scope.ok = function () {
//         $modalInstance.close($scope.customer);
//     };
// 
//     $scope.cancel = function () {
//         $modalInstance.dismiss('cancel');
//     };
// }