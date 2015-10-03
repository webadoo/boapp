var app = angular.module('boapp');

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

app.factory('CustomerModalService', ['$modal', 'CustomerService', function($modal, CustomerService) {
	return {
		editCustomer: function(customer) {
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
		}
	}
}]);