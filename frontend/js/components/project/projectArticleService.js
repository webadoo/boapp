var app = angular.module('boapp');

app.factory('ProjectsService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'ProjectArticle', {}, {
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
    })
});

app.factory('ProjectService', function($resource, configParseAPI) {
	return $resource(configParseAPI.api_url + 'ProjectArticle/:id', {}, {
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