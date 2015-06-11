var sampleapp = angular.module('sampleapp', ['colresizer']);
sampleapp.controller('samplectrl', function ($scope) {
    
    $scope.columns = ['Id', 'Active', 'Balance', 'Age', 'Gender'];

    $scope.items = [
        {
            "id": 1,
            "active": false,
            "balance": 3375.75,
            "age": 30,
            "gender": "male"
        },
        {
            "id": 2,
            "active": false,
            "balance": 3562.12,
            "age": 35,
            "gender": "male",
            "date": "2015-02-16"
        },
        {
            "id": 3,
            "active": true,
            "balance": 2500.68,
            "age": 26,
            "gender": "male",
            "date": "2014-12-15"
        },
        {
            "id": 4,
            "active": true,
            "balance": 3906.24,
            "age": 27,
            "gender": "male",
            "date": "2014-02-11"
        },
        {
            "id": 5,
            "active": true,
            "balance": 2367.89,
            "age": 31,
            "gender": "male",
            "date": "2015-05-31"
        }
    ];
});



