var app = angular.module('boapp');

app.directive('customerBox', ['CustomerModalService', function(CustomerModalService) {
    
    var controller = function() {
        var self = this;
        
        self.editCustomer
          
//         function init() {
//             vm.items = angular.copy(vm.datasource);
//         }
//               
//               init();
//               
//               vm.addItem = function () {
//                   vm.add();
// 
//                   //Add new customer to directive scope
//                   vm.items.push({
//                       name: 'New Directive Controller Item'
//                   });
//               };
    }
    
    return {
        restrict: 'EA',
        scope: {
            customer: '='          
        },
        replace: true, 
        templateUrl: 'views/customerbox.html',  
        editCustomer: function() {
            console.log('test');
        }
    };
 }]);


// function customerBox($timeout) {
//     return {
//         restrict: 'EA',
//         scope: {
//             customer: '='        
//         },
//         replace: true, 
//         templateUrl: 'views/customerbox.html',  
//     };
// }