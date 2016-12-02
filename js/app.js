var app = angular.module('MonApp', ['ngRoute', 'ngAnimate', 'ngMap']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'PostsCtrl',
        })
        .when('/comments/:id', {
            templateUrl: 'partials/comments.html',
            controller: 'CommentsCtrl',
        })
        .otherwise({
            redirectTo: '/'
        });
})