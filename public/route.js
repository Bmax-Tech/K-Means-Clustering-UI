/**
 * Created by buwan on 4/12/2017.
 */
app.config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeController'
    }).otherwise('/');
}]);