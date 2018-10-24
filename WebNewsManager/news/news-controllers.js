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

app.controller('mainCtrl', function($scope, LoginService, $http, $location){

    // Function to show Search Bar
    $scope.searchBar = false;
    $scope.showSearch = function(){
        if (!$scope.searchBar){
            $scope.searchBar = true;
        }else{
            $scope.searchBar = false;
        }
    }

    //Function to show Log in Form
    $scope.wantsToLogIn = false;
    $scope.showTheLogIn = function(){
        $scope.wantsToLogIn = true;
    }

    // Funtion to see wether the category is active or not in the navbar
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    // Log in variables
    $scope.username = '';
    $scope.password = '';
    $scope.loggedIn = false;
    

    // Function to reset log in form
    $scope.resetLogin = function(){
        $scope.wantsToLogIn = false;
        $scope.username = '';
        $scope.password = '';
    };

    // Function to obtain token after log in
    $scope.logIn = function(){
        LoginService.login({passwd: $scope.password, username: $scope.username}, function(data){
            $http.defaults.headers.common['Authorization'] = data.Authorization + ' apikey=' + data.apikey;
            $scope.loggedIn = true;
            $location.path("/");
        });
    }

    // Function to log out
    $scope.logOut = function(){
        $http.defaults.headers.common['Authorization'] = 'PUIRESTAUTH apikey=REVWX1RFQU1fMDE=';
        $scope.loggedIn = false;
        $scope.resetLogin();
    }

    //Callback for ng-click 'addNew'
    $scope.addNew = function (newId) {
        $location.path('/add');
    };

});

app.controller('newsCreationCtrl', function($scope, NewsDetailsService, $http, $location){
    $scope.new = {
        title: '',
        subtitle: '',
        abstract: '',
        body: '',
        category: '',
        image_media_type: '',
        image_data: ''
    };

    // Function to obtain token after log in
    $scope.createNew = function(){
        NewsDetailsService.save({title: $scope.new.title, subtitle: $scope.new.subtitle, abstract: $scope.new.abstract, body: $scope.new.body, category: $scope.new.category, image_media_type: $scope.new.image_media_type, image_data: $scope.new.image_data}, function(data){
           
        });
    }

});


