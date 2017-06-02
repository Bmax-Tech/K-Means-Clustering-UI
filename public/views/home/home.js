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
    }, {
        id: 5,
        label: "Five cluster"
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
            },
            tooltip: {
                contentGenerator: function (d) {
                    return '<div><p class="tooltip-title-1">#' + d.point.item_no + '</p>' +
                        '<p class="tooltip-title-2">cluster : ' + (d.point.cluster + 1) + '</p>' +
                        '<p>(' + d.point.x.toFixed(2) + ', ' + d.point.y.toFixed(2) + ')</p></div>';
                }
            }
        }
    };

    function generateData(data_set) {
        var chart_data = [], shapes = ['circle', 'triangle-up'];

        for (var i = 1; i <= data_set.center_points.length; i++) {
            chart_data.push({
                key: 'Cluster ' + i,
                values: []
            });
        }
        var count = 0;
        for (var i = 0; i < data_set.data_points.length; i++) {
            chart_data[data_set.data_points[i].cluster].values.push({
                item_no: data_set.data_points[i].item_no,
                cluster: data_set.data_points[i].cluster,
                x: data_set.data_points[i].x,
                y: data_set.data_points[i].y,
                size: 5,
                shape: shapes[data_set.data_points[i].cluster]
            });
            count++;
        }

        $scope.total_count = count;
        return chart_data;
    }
});