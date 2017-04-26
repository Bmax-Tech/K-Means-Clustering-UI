/**
 * Created by buwan on 4/12/2017.
 */
app.controller('HomeController', function HomeController($scope, $http) {
    $scope.dataset = [];
    $scope.total_count = 0;
    $scope.loading = false;
    $scope.items = [{
        id: 1,
        label: "One cluster"
    }, {
        id: 2,
        label: "Two cluster"
    }, {
        id: 3,
        label: "Three cluster"
    }, {
        id: 4,
        label: "Four cluster"
    }];
    $scope.selected = $scope.items[0];

    $scope.__init__ = function () {
        // getData();
    };

    $scope.generate = function () {
        $scope.loading = true;
        getData();
    };

    function getData() {
        $http({
            method: 'POST',
            url: BASE_URL + '/getData',
            headers: {'Content-Type': 'application/json'},
            data: $scope.selected
        }).then(function (res) {
            console.log(res);
            $scope.dataset = angular.copy(res.data);
            $scope.data = generateData(res.data);
            $scope.loading = false;
            // $scope.$apply();
        }, function errorCallback(response) {
            console.error(response);
        });
    }

    // chart options
    $scope.options = {
        chart: {
            type: 'scatterChart',
            height: 500,
            color: d3.scale.category10().range(),
            scatter: {
                onlyCircles: false
            },
            showDistX: true,
            showDistY: true,
            duration: 350,
            xAxis: {
                axisLabel: 'Dimension 1',
                tickFormat: function (d) {
                    return d3.format('.02f')(d);
                }
            },
            yAxis: {
                axisLabel: 'Dimension 2',
                tickFormat: function (d) {
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -5
            },
            zoom: {
                enabled: true,
                scaleExtent: [1, 10],
                useFixedDomain: false,
                useNiceScale: true,
                horizontalOff: false,
                verticalOff: false,
                unzoomEventType: 'dblclick.zoom'
            }
        }
    };

    function generateData(data_set) {
        var data = {}, chart_data = [],
            shapes = ['circle', 'triangle-up'];

        // get clusters
        for (var i = 0; i < data_set.sample_preds.length; i++) {
            if (data[data_set.sample_preds[i]] == undefined) {
                data[data_set.sample_preds[i]] = [];
            }
            data[data_set.sample_preds[i]].push(i);
        }

        // assign values
        var main_count = 0;
        var count = 0;
        angular.forEach(data, function (value, key) {
            chart_data.push({
                key: 'Cluster ' + (parseInt(key) + 1),
                values: []
            });
            for (var i = 0; i < value.length; i++) {
                chart_data[main_count].values.push({
                    x: data_set.data_points[i].x,
                    y: data_set.data_points[i].y,
                    size: 5,
                    shape: shapes[main_count]
                });
                count++;
            }
            main_count++;
        });
        $scope.total_count = count;
        //console.log(chart_data);
        return chart_data;
    }
});