var app = angular.module('myApp');

app.factory('$products',function(){
  return {
    availableFilters : ["All Jackets","2016","jacket","Jackets","layers","Obermeyer","Roxy","womens"],
    availableSorts   : ["Featured","Best Selling","Alphabetically, A-Z","Alphabetically, Z-A","Price, low to high","Price, high to low","Date, new to old","Date, old to new"],
    catalog : makeJackets()    
  };
  
  
app.controller('ProductController', function( $scope, $products,$mdMedia) {
    $scope.$mdMedia           = $mdMedia;

    this.filterByde       = "All Jackets";
    this.sortedBy         = "Featured";    
    this.availableFilters = $products.availableFilters;
    this.availableSorts   = $products.availableSorts; 
    this.catalog          = $products.catalog;        
})



function makeJackets() {    
   var list=[ ], 
   master = [{
          imageURL : "https://cdn.shopify.com/s/files/1/0938/8938/products/10231100205_1_1315x1800_300_CMYK_1024x1024.jpeg?  v=1445623369",
          title : "Winter Jacket",
          price : "$99.99"
   },{
     
          imageURL : "http://pukkaind.biz/images/categories/16Wool%20varsity%20Letterman%20jacket%20Royal-white.jpg",
          title : "summer Jacket",
          price : "$24.55"
   },{
      imageURL : "https://cdn.shopify.com/s/files/1/0938/8938/products/10231100205_1_1315x1800_300_CMYK_1024x1024.jpeg?  v=1445623369",
          title : "summer Jacket",
          price : "$12.55"
     
   },{
      imageURL : "https://cdn.shopify.com/s/files/1/0938/8938/products/10231100205_1_1315x1800_300_CMYK_1024x1024.jpeg?  v=1445623369",
          title : "summer Jacket",
          price : "$32.55"
     
   }]
    


for(var j=0;j<6;j++) {
      list.push(angular.extend({},master[j]));
      }    
      return list;    
      } 
})