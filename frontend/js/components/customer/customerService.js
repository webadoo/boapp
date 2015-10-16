var app = angular.module('boapp');

app.factory('CustomersSharedDataService', ['CustomersService', function(CustomersService) {
	console.log('CustomersSharedDataService');
	
	var theData = {
		customers: [],
		add: add,
		remove: remove,
		getCustomers: getCustomers
	};
	
	function add(customer) {
		console.log('CustomersSharedDataService.push(): ' + customer);
		theData.customers.push(customer);
	}
	
	function remove(customer) {
		console.log('CustomerSharedDataService.remove(): ' + customer.objectId);
		theData.customers = _.reject(theData.customers, function(c) { return c.objectId === customer.objectId});				
	}
	
	
	function getCustomers(where, order) {
		
		console.log('CustomerSharedDataService.getCustomers()');
		
		var queryParams = {};
		
		if (where) {
			queryParams.where = where;
		}
		
		if (order) {
			queryParams.order = order;
		}
		
		CustomersService.query(queryParams).$promise.then(function(result) {
			console.log('CustomerSharedDataService.getCustomers().query()');
			theData.customers = result.results;
			console.log(theData.customers);
			return true;
		});
	}
	
	return theData;
}]);


app.factory('CustomersService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Customer', {}, {
        query: { 
			method: 'GET', 
			isArray: false,
			headers: {
				'X-Parse-Application-Id': configParseAPI.parse_application_id,
				'X-Parse-REST-API-Key': configParseAPI.parse_rest_api_key
			}
		},
        create: { 
			method: 'POST',
			headers: {
				'X-Parse-Application-Id': configParseAPI.parse_application_id,
				'X-Parse-REST-API-Key': configParseAPI.parse_rest_api_key
			}
		}
    })
});

app.factory('CustomerService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Customer/:id', {}, {
		show: { 
			method: 'GET',						
			headers: {
				'X-Parse-Application-Id': configParseAPI.parse_application_id,
				'X-Parse-REST-API-Key': configParseAPI.parse_rest_api_key
			}
		},
		update: {
			method: 'PUT',
			params: { id: '@objectId' },
			headers: {
				'X-Parse-Application-Id': configParseAPI.parse_application_id,
				'X-Parse-REST-API-Key': configParseAPI.parse_rest_api_key
			}
		},
		delete: {
			method: 'DELETE',
			params: { id: '@objectId' },
			headers: {
				'X-Parse-Application-Id': configParseAPI.parse_application_id,
				'X-Parse-REST-API-Key': configParseAPI.parse_rest_api_key
			}
		}
	})
});

app.factory('CustomerModalService', ['$modal', 'CustomerService', 'CustomersSharedDataService', function($modal, CustomerService, CustomersSharedDataService) {
	return {
		editCustomer: function(customer) {
			//var customerForEdit = 
			console.log('CustomerModalService.editCustomer()');
			var modalInstance = $modal.open({
				templateUrl: 'views/modal_customer.html',
				controller: 'EditCustomerModalInstanceController as modal',
				resolve: {
					customer: function() {
						return customer;
					}
				}
			});
		 
			modalInstance.result.then(function(customer) {
				CustomerService.update(customer);
			});
		},
		deleteCustomer: function(customer) {
			console.log('ConsoleModalService.deleteCustomer()');
			var modalInstance = $modal.open({
				templateUrl: 'js/components/customer/deleteCustomerView.html',
				controller: 'DeleteCustomerModalInstanceController as modal',
				resolve: {
					customer: function() {
						return customer;
					}
				}
			});
		 
			modalInstance.result.then(function(customer) {
				CustomersSharedDataService.title = '123';
				console.log('CustomerModalService.deleteCustomer().ModalResult: ' + customer.objectId);
				customer.deleted = true;
				CustomerService.update(customer);
				CustomersSharedDataService.remove(customer);
				//CustomersSharedDataService.customers = _.reject(CustomersSharedDataService.customers, function(c) { return c.objectId === customer.objectId});
				console.log(CustomersSharedDataService.customers);
				
			});
		}
	}
}]);