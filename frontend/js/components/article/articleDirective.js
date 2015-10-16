var app = angular.module('boapp');

app.directive('articleBox', ['$modal', 'ArticleModalService', 'ArticleService', function($modal, ArticleModalService, ArticleService) {
    
    var controller = function($scope) {
        var self = this;
        
        function init() {
            self.article = angular.copy(self.article);
        }
       
        init();
        
        self.editArticle = function() {            
            ArticleModalService.editCustomer(self.article);
        }
        
        self.deleteCustomer = function() {
            ArticleModalService.deleteCustomer(self.article);
        }     
    };
    
    return {
        restrict: 'EA',
        scope: {
            article: '='         
        },
        replace: true, 
        templateUrl: 'views/articlebox.html',  
        controller: controller,
        controllerAs: 'vm',
        bindToController: true
       
    };
}]);