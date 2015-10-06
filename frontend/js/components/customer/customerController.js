var app = angular.module('boapp');

app.controller('CustomersController', ['$scope', '$modal', 'CustomersService', 'CustomerService', 'CustomersSharedDataService', function($scope, $modal, CustomersService, CustomerService, CustomersSharedDataService) {
	 this.vm = {
	 	search: ''
	 };
	 
	 $scope.data = CustomersSharedDataService;
	 
	 this.getCustomers = function() {
		console.log('customerController.getCustomers()');
		console.log('search: ' + this.vm.search)
		CustomersService.query({ where: { deleted: false, name: this.vm.search }, order: 'name' }).$promise.then(function(result) {
			CustomersSharedDataService.customers = result.results;
		});
	 };
	 
	 this.getCustomers();
	 
	 this.addCustomer = function() {
		 console.log('customerController.addCustomer()');
		 var modalInstance = $modal.open({
          	templateUrl: 'views/modal_customer.html',
          	controller: 'AddCustomerModalInstanceController as modal'
       	 });
       
       	 modalInstance.result.then(function(customer) {
          	console.log(customer);
          	CustomersService.create(customer);
			CustomersSharedDataService.add(customer);		 
       	 });
	 }
	 
	//  this.editCustomer = function(customer) {
	// 	 console.log('customerController.editCustomer():' + customer);
	// 	 
	// 	 var modalInstance = $modal.open({
	// 		 templateUrl: 'views/modal_customer.html',
	// 		 controller: 'EditCustomerModalInstanceController as modal',
	// 		 resolve: {
	// 			 customer: function() {
	// 				 return customer;
	// 			 }
	// 		 }
	// 	 });
	// 	 
	// 	 modalInstance.result.then(function(customer) {
	// 		 CustomerService.update(customer);
	// 	 });
	//  }
	 
	//  this.deleteCustomer = function(customer) {
	// 	 console.log('customerController.deleteCustomer(): ' + customer);
	// 	 var modalInstance = $modal.open({
	// 		 templateUrl: 'deleteCustomerView.html',
	// 		 controller: 'DeleteCustomerModalInstanceController as modal',
	// 		 resolve: {
	// 			 customer: function() {
	// 				 return customer;
	// 			 }
	// 		 }
	// 	 });
	// 	 
	// 	 modalInstance.result.then(function(customer) {
	// 		CustomerService.deleteCustomer(customer);
	// 	 });
	//  }
}]);


app.controller('AddCustomerModalInstanceController', function($modalInstance) {
	var self = this;
	self.vm = {
		title: "Klant toevoegen",
		customer: { deleted: false },
	}
	
	self.ok = function() {
		console.log('AddCustomerModalInstanceController.ok()');
		$modalInstance.close(self.vm.customer);
	}
	
	self.cancel = function() {
		console.log('AddCustomerModalInstanceController.cancel()');
		$modalInstance.dismiss('cancel');
	};
});

app.controller('EditCustomerModalInstanceController', function($modalInstance, customer) {
	var self = this;
	self.vm = {
		title: "Klant aanpassen",
		customer: customer
	}
	
	self.ok = function() {
		console.log('EditCustomerModalInstanceController.ok()');
		$modalInstance.close(self.vm.customer);
	};
	
	self.cancel = function() {
		console.log('EditCustomerModalInstanceController.cancel()');
		$modalInstance.dismiss('cancel');
	}
});

app.controller('DeleteCustomerModalInstanceController', function($modalInstance, customer) {
	var self = this;
	self.vm = {
		title: "Klant verwijderen",
		customer: customer
	}
	
	self.ok = function() {
		console.log('DeleteCustomerModalInstanceController.ok()');
		$modalInstance.close(self.vm.customer);
	}
	
	self.cancel = function() {
		console.log('DeleteCustomerModalInstanceController.cancel()');
		$modalInstance.dismiss('cancel');
	}
});