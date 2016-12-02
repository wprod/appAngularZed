app.controller('CommentsCtrl', function($scope, PostFactory, NgMap, $routeParams, $rootScope) {

    $rootScope.loading = true;


    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);

    });

    $scope.reRenderMap = function() {
        $timeout(function() {
            angular.forEach($scope.maps, function(index) {
                google.maps.event.trigger(index, 'resize');
            });
        }, 500);
    }

    $scope.maps = [];

    $scope.$on('mapInitialized', function(evt, evtMap) {
        $scope.maps.push(evtMap);
    });


    $scope.newComment = {};

    PostFactory.get($routeParams.id).then(function(post) {
        $rootScope.loading = false;
        $scope.title = post.name;
        $scope.picture = post.picture;
        $scope.content = post.content;
        $scope.comments = post.comments;
        $scope.fullcontent = post.fullcontent;
        $scope.positions = post.positions;
        console.log($scope.positions);
    }, function(msg) {
        alert(msg);
    });

    $scope.addComment = function() {
        $scope.comments.push($scope.newComment);
        $scope.newComment = {};

        PostFactory.add($scope.newComment).then(function() {

        }, function() {
            alert('Erreur message non sauvegarde');
        });

    }

});