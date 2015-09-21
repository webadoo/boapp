var app = angular.module('inspinia');

/**
 * Customers
 */
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
/**
 * Einde customers
 */
 
 
/**
 * Articles
 */
app.factory('ArticlesService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Article', {}, {
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

app.factory('ArticleService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Article/:id', {}, {
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


/**
 * Projects
 */
app.factory('ProjectsService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Project', {}, {
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

app.factory('ProjectService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Project/:id', {}, {
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
/**
 * End projects
 */
 
/**
 * Statusses
 */
app.factory('StatussesService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'Status', {}, {
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

/**
 * End statusses
 */