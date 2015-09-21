/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/index/main");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: true
    });

    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.customers', {
            url: "/customers",
            templateUrl: "views/customers.html",
            data: { pageTitle: 'Klanten' }
        })
        .state('index.articles', {
            url: "/articles",
            templateUrl: "views/articles.html",
            data: { pageTitle: 'Artikels' }
        })
        .state('index.projects', {
            url: "/projects",
            templateUrl: "views/projects.html",
            data: { pageTitle: 'Projecten' }
        })
        .state('index.invoices', {
            url: "/invoices",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Facturen' }
        })
        .state('index.timeregistration', {
            url: "/timeregistration",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Tijdsregistratie' }
        });
     
     this.api_url_classes = 'https://api.parse.com/1/classes/';
     this.parse_application_id = '8D8eeq1axttkT6UAzsnOP1QqBjRHjHWxtGdJC8LD';
	 this.parse_rest_api_key = 'RknJYgwv37RK1GD5CD9CJxs4Ft7ky9IfACaKhBwL';
}
angular
    .module('inspinia')
    .config(config)
    .constant('configParseAPI', {
		'api_url': 'https://api.parse.com/1/classes/',
		'parse_application_id': '8D8eeq1axttkT6UAzsnOP1QqBjRHjHWxtGdJC8LD',
		'parse_rest_api_key': 'RknJYgwv37RK1GD5CD9CJxs4Ft7ky9IfACaKhBwL'	
	})
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
