/*************************************************************************************************
/////////////////////////////////////// NEWS CONTROLLERS /////////////////////////////////////////
*************************************************************************************************/

app.controller('newsListCtrl', function($scope, $routeParams, $filter, $location, NewsListService, NewsDetailsService){

    // Variable for the newsList from server
    $scope.news = '';
    $scope.allNews = '';

    // Function to get news from server 
    $scope.getNews = function(){
        NewsListService.query(function(data){
           if($routeParams.category != null){
                $scope.news = $filter('filter')(data ,{category:$routeParams.category});
                console.log(data); 
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

    // Function to make sure user wants to delete new
    $scope.confirmation = false;
    $scope.deleted = false;
    $scope.failed = false;
    $scope.articleToDelete = {
        id:'',
        title:''
    };
    
    $scope.confirmDelete = function (id){
        $scope.confirmation = true;
        $scope.articleToDelete.id = id;
        aux = $filter('filter')($scope.news ,{id: id});
        $scope.articleToDelete.title = aux[0].title;
        $('#alert').modal('show');
    };

    // Function to delete new
    $scope.deleteNew = function (){
        $scope.confirmation = false;
        NewsDetailsService.delete({id: $scope.articleToDelete.id}, function(data){
            if (data.$resolved){
                console.log("resolved!");
                $scope.deleted = true;
            }else{
                console.log("notResolved!");
                $scope.failed = true;
            }
        });
    };

    // Function to hide modal 
    $scope.hideModal = function (){
        $scope.deleted = false;
        $scope.failed = false;
        $scope.getNews();
    }

    // Function to get to edit mode
    $scope.editNew = function(id) {
        $location.path('/edit/' + id);
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

app.controller('mainCtrl', function($scope, $location, $http, $rootScope){

    
    // Log in Variables
    $rootScope.user = {
        username: '',
        password: '',
        loggedIn: false
    };

    // Function to log out
    $scope.logOut = function(){
        console.log("log outttt");
        $http.defaults.headers.common['Authorization'] = 'PUIRESTAUTH apikey=REVWX1RFQU1fMDE=';
        $rootScope.user.loggedIn = false;
        $rootScope.user.username = '';
        $rootScope.user.password = '';
        console.log($scope.user.loggedIn);
    };

    // Function to go to Log in
    $scope.showTheLogIn = function(){
        console.log("show the log in");
        $location.path('/login');
    };

    // Function to show Search Bar
    $scope.searchBar = false;
    $scope.showSearch = function(){
        if (!$scope.searchBar){
            $scope.searchBar = true;
        }else{
            $scope.searchBar = false;
        }
    }

    // Funtion to see wether the category is active or not in the navbar
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    // Callback for ng-click 'addNew'
    $scope.addNew = function () {
        $location.path('/add');
    };

});

app.controller('newsCreationCtrl', function($scope, $location, NewsDetailsService){
    $scope.new = {
        title: '',
        subtitle: '',
        abstract: '',
        body: '',
        category: '',
        image_media_type: '',
        image_data: ''
    };

    // Function to create new
    $scope.result = false;
    $scope.createNew = function(){
        NewsDetailsService.save({title: $scope.new.title, subtitle: $scope.new.subtitle, abstract: $scope.new.abstract, body: $scope.new.body, category: $scope.new.category, image_media_type: $scope.new.image_media_type, image_data: $scope.new.image_data}, function(data){
           console.log(data);
            if(data.status == '200'){
                $scope.result = true;
            }else {
                $scope.result = false;
            }  
            $('#alert').modal('show');
        });
    };

    // Function to show preview 
    $scope.showImage = true;
    $scope.showPreview = function (){
        $scope.showImage = true;
    };

    // Function to clear Form
    $scope.resetForm = function(){
        $scope.new.title = '';
        $scope.new.subtitle = '';
        $scope.new.abstract = '';
        $scope.new.body = '';
        $scope.new.category = '';
        $scope.new.image_media_type = '';
        $scope.new.image_data = '';

        // Hide image preview
        $scope.showImage = false;

        // Avoid getting errors for the fields when reseting
        $scope.createNewForm.$setPristine();
        $scope.createNewForm.$setValidity();
        $scope.createNewForm.$setUntouched();
    };

    // Function to go back
    $scope.cancelForm = function(){
        $scope.resetForm();

        // Closes modal window
        $('#alert').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        // Goes back to the main page
        $location.path('');
    };


});

app.controller('newsEditionCtrl', function($scope, $routeParams, $location, NewsDetailsService){
    
    $scope.new = '';

    //Function to get the new from server
    $scope.getNew = function(){
        NewsDetailsService.get( {id:$routeParams.id} ,function(data){
           $scope.new = data;
        },
        function(error){
            console.log("KO");
        });
    };

    // Function to create new
    $scope.result = false;
    $scope.updateNew = function(){
        NewsDetailsService.save({id:$routeParams.id, title: $scope.new.title, subtitle: $scope.new.subtitle, abstract: $scope.new.abstract, body: $scope.new.body, category: $scope.new.category, image_media_type: $scope.new.image_media_type, image_data: $scope.new.image_data}, function(data){
           console.log(data);
            if(data.status == '200'){
                $scope.result = true;
            }else {
                $scope.result = false;
            }  
            $('#alert').modal('show');
        });
    };

    // Function to show preview 
    $scope.showImage = true;
    $scope.showPreview = function (){
        $scope.showImage = true;
    };

    // Function to clear Form
    $scope.resetForm = function(){
        $scope.new.title = '';
        $scope.new.subtitle = '';
        $scope.new.abstract = '';
        $scope.new.body = '';
        $scope.new.category = '';
        $scope.new.image_media_type = '';
        $scope.new.image_data = '';

        // Hide image preview
        $scope.showImage = false;

        // Avoid getting errors for the fields when reseting
        $scope.createNewForm.$setPristine();
        $scope.createNewForm.$setValidity();
        $scope.createNewForm.$setUntouched();
    };

    // Function to go back
    $scope.cancelForm = function(){
        $scope.resetForm();

        // Closes modal window
        $('#alert').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        // Goes back to the main page
        $location.path('');
    };
});

app.controller('loginCtrl', function($scope, $rootScope, $location, $http, LoginService){
    

    // Function to obtain token after log in
    $scope.logIn = function(){
        LoginService.login({passwd: $scope.user.password, username: $scope.user.username}, function(data){
            $http.defaults.headers.common['Authorization'] = data.Authorization + ' apikey=' + data.apikey;
            $rootScope.user.loggedIn = true;
            $location.path("/");
        });
    }

    // Function to reset login 
    $scope.resetLogin = function(){
        $rootScope.user.username = '';
        $rootScope.user.password = '';

        // Avoid getting errors for the fields when reseting
        $scope.logInForm.$setPristine();
        $scope.logInForm.$setValidity();
        $scope.logInForm.$setUntouched();
    }


});

