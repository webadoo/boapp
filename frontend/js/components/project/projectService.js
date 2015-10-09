var app = angular.module('boapp');

app.factory('ProjectsSharedDataService', function () {
	var theData = {
		projects: [],
		add: add,
		remove: remove
	};
	
	function add(project) {
		console.log('ProjectsSharedDataService.add()');
		theData.projects.push(project);
	}
	
	function remove(project) {
		console.log('ProjectsSharedDataService.remove()');
		theData.projects = _.reject(theData.projects, function(p) { return p.objectId === project.objectId });
	}
	
	return theData;
});


app.factory('ProjectService', function($resource, configParseAPI) {
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
		},
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