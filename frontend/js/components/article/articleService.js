var app = angular.module('boapp');

app.factory('ArticlesSharedDataService', ['ArticlesService', function(ArticlesService) {
	
	var theData = {
		articles: [],
		add: add,
		remove: remove,
		getArticles: getArticles	
	};
	
	function add(article) {
		console.log('ArticlesSharedDataService.add()');
		theData.articles.push(article);
	}
	
	function remove(article) {
		console.log('ArticlesSharedDataService.remove()');
		theData.articles = _.reject(theData.articles, function(a) { return a.objectId === article.objectId });
	}
	
	function getArticles(where, order) {
		var queryParams = {};
		if (where) {
			queryParams.where = where;
		}
		
		if (order) {
			queryParams.order = order;
		}
		
		ArticlesService.query(queryParams).$promise.then(function(result){
			console.log('ArticlesSharedDataService.getArticles().query');
			theData.articles = result.results;
			return true;
		});
	}
	
	return theData;
}]);

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

app.factory('ArticleModalService', ['$modal', 'ArticleService', 'ArticlesSharedDataService', function($modal, ArticleService, ArticlesSharedDataService) {
	return {
		editArticle: function(article) {
			console.log(article);
			var modalInstance = $modal.open({
				templateUrl: 'views/modal_article.html',
				controller: 'EditArticleModalInstanceController as modal',
				resolve: {
					article: function() {
						return article;
					}
				}
			});
		 
			modalInstance.result.then(function(article) {
				ArticleService.update(article);
			});
		},
		deleteArticle: function(article) {
			var modalInstance = $modal.open({
				templateUrl: 'js/components/article/deleteArticleView.html',
				controller: 'DeleteArticleModalInstanceController as modal',
				resolve: {
					article: function() {
						return article;
					}
				}
			});
		 
			modalInstance.result.then(function(article) {
				article.deleted = true;
				ArticleService.update(article);
				ArticlesSharedDataService.remove(article);
				console.log(ArticlesSharedDataService.articles);				
			});
		}
	}
}]);