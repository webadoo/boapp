var app = angular.module('boapp');

app.directive('customerBox', ['$modal', 'CustomerModalService', 'CustomerService', function($modal, CustomerModalService, CustomerService) {
    
    var controller = function() {
        var self = this;
        
        function init() {
            self.customer = angular.copy(self.customer);
        }
        
        init();
        
        self.editCustomer = function() {
            console.log('customerBoxDirective.editCustomer()');
            CustomerModalService.editCustomer(self.customer);
        }
        
        self.deleteCustomer = function() {
            console.log('customerBoxDirective.deleteCustomer()');
            var modalInstance = $modal.open({
			 templateUrl: 'views/modal_customer.html',
			 controller: 'EditCustomerModalInstanceController as modal',
			 resolve: {
				 customer: function() {
					 return self.customer;
				 }
			 }
		 });
		 
		 modalInstance.result.then(function(customer) {
			 CustomerService.update(customer);
		 });
        }
        
    };
    
    return {
        restrict: 'EA',
        scope: {
            customer: '='          
        },
        replace: true, 
        templateUrl: 'views/customerbox.html',  
        controller: controller,
        controllerAs: 'vm',
        bindToController: true
    };
}]);