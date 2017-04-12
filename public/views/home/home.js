/**
 * Created by buwan on 4/12/2017.
 */
app.controller('HomeController', function HomeController($scope, $http) {

    $scope.dataset = [];

    $scope.__init__ = function () {
        getData();
    };

    function getData() {
        $http({
            method: 'GET',
            url: BASE_URL + '/getData',
            headers: {'Content-Type': 'application/json'}
        }).then(function (res) {
            console.log(res);
            $scope.dataset = angular.copy(res.data);
        }, function errorCallback(response) {
            console.error(response);
        });
    }
});