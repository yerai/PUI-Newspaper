/*************************************************************************************************
/////////////////////////////////////// NEWS CONTROLLERS /////////////////////////////////////////
*************************************************************************************************/

app.controller('newsListCtrl', function($scope, $routeParams, $filter, $location, NewsListService){

    //Variable for the newsList from server
    $scope.news = '';

    //Function to get news from server 
    $scope.getNews = function(){
        NewsListService.query(function(data){
           if($routeParams.category != null){
                $scope.news = $filter('filter')(data ,{category:$routeParams.category});
            } else{
                $scope.news = data; 
            } 
        },
        function(error){
        });
    };
    
    //Callback for ng-click 'showNew'
    $scope.showNew = function (newId) {
        $location.path('/show/' + newId);
    };

    //Function to Show base 64 Image
    $scope.getImage = function(imageType, data){
        return "data:" + imageType +  ";base64, " + data;
    };
});

app.controller('newsShowCtrl', function($scope, $routeParams, NewsDetailsService){
    
    //The new with the ID given
    $scope.new = '';

    //Function to get the new from server
    $scope.getNew = function(){
        console.log($routeParams.id);
        NewsDetailsService.get( {id:$routeParams.id} ,function(data){
           $scope.new = data;
        },
        function(error){
            console.log("KO");
        });
    };

     //Function to Show base 64 Image
     $scope.getImage = function(imageType, data){
        return "data:" + imageType +  ";base64, " + data;
    };
});

app.controller('mainCtrl', function($scope, LoginService, $routeParams, $filter, $location, NewsListService){

    $scope.username = '';
    $scope.password = '';

   

    $scope.resetLogin = function(){
        $scope.username = '';
        $scope.password = '';
    };

});


