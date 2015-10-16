var app = angular.module('boapp');

app.factory('InvoicesSharedDataService', ['InvoicesService', function(InvoicesService) {
	
	var theData = {
		invoices: [],
		add: add,
		remove: remove,
		getInvoices: getInvoices	
	};
	
	function add(invoice) {
		theData.invoices.push(invoice);
	}
	
	function remove(invoice) {
		theData.invoices = _.reject(theData.invoices, function(a) { return a.objectId === invoice.objectId });
	}
	
	var getInvoices = new Promise(function(resolve, reject) {
		// do a thing, possibly async, then…
	   	var list = InvoicesService.query();
		
		if (ok) {
			resolve("Stuff worked!");
		}
		else {
			reject(Error("It broke"));
		}
	});
	
	return theData;
}]);

app.factory('InvoicesService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Invoice', {}, {
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

app.factory('InvoiceService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Invoice/:id', {}, {
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

app.factory('InvoiceModalService', ['$modal', 'InvoiceService', 'InvoicesSharedDataService', function($modal, InvoiceService, InvoicesSharedDataService) {
	return {
		editInvoice: function(invoice) {
			var modalInstance = $modal.open({
				templateUrl: 'views/modal_invoice.html',
				controller: 'EditInvoiceModalInstanceController as modal',
				resolve: {
					invoice: function() {
						return invoice;
					}
				}
			});
		 
			modalInstance.result.then(function(invoice) {
				InvoiceService.update(invoice);
			});
		},
		deleteInvoice: function(invoice) {
			var modalInstance = $modal.open({
				templateUrl: 'js/components/customer/deleteInvoiceView.html',
				controller: 'DeleteInvoiceModalInstanceController as modal',
				resolve: {
					invoice: function() {
						return invoice;
					}
				}
			});
		 
			modalInstance.result.then(function(invoice) {
				invoice.deleted = true;
				InvoiceService.update(invoice);
				InvoicesSharedDataService.remove(invoice);
				console.log(InvoicesSharedDataService.invoices);				
			});
		}
	}
}]);