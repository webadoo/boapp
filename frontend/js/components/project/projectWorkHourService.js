var app = angular.module('boapp');

app.factory('ProjectWorkHoursService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'ProjectWorkHour', {}, {
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
		},
    });
});

app.factory('ProjectWorkHourService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'ProjectWorkHour/:id', {}, {
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