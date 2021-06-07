/// <reference path="../angular.min.js" />
var app = angular.module("navtechApp", []);
app.controller("prodController", function ($scope, $http) {
    $scope.ListData = "";
    $scope.setLimit = 10;
    var listData = "";
    $scope.SearchResult = false;
    $http({
        method: "GET",
        url: "/Product/GetAllFields"
    }).then(function (res) {
        if (res.data != null) {
            if (JSON.stringify(res.data).includes("Exception")) {
                HideProgressbar();
                window.location.href = '/Home/Error?err=' + res.data[0].inactive;
            }
            else {

                $scope.ListData = res.data;
                angular.forEach($scope.ListData, function (value, key) {
                    value.IsRequired = value.IsRequired == true ? "Yes" : "No";
                });

                $scope.totalItems = $scope.ListData.length;
                $scope.currentPage = 1;
                $scope.numPerPage = $scope.setLimit;
                listData = res.data;
                $scope.paginate = function (value) {
                    var begin, end, index;
                    begin = ($scope.currentPage - 1) * $scope.numPerPage;
                    end = begin + $scope.numPerPage;
                    index = $scope.ListData.indexOf(value);
                    return (begin <= index && index < end);
                }
                HideProgressbar();
            }
        }
    })

    $scope.sortColm = 'entityName';
    /*$scope.sortingOrder = true;*/
    $scope.SortColumn = function (colName) {
        $scope.sortingOrder = $scope.sortColm == colName ? !$scope.sortingOrder : false;
        $scope.sortColm = colName;
    }

    $scope.OpenAddModal = function () {
        location.href = "/Home/AddProducts";
    }

    $scope.OpenAddEditModal = function (obj) {
        document.getElementById("AddEditModal").style.display = "block";

        $scope.EntNm = "";
        $scope.FldNm = "";
        $scope.IsReq = "";
        $scope.MaxLen = "";
        $scope.FldSrc = "";
        
        $scope.EntNm = obj.entityName;
        $scope.FldNm = obj.fieldName;
        $scope.IsReq = obj.isRequired == true ? 1 : 0;
        $scope.MaxLen = obj.maxLength;
        $scope.FldSrc = obj.fieldSource;
    }

    $scope.DeleteRecord = function (obj) {
        var delItmID = obj.entityName + "_" + obj.fieldName;
        var modalConfirm = function (callback) {
            $("#confirmModal").show();
            $("#confirmYes").click(function () {
                callback(true);
                $("#confirmModal").hide();
            });
            $("#confirmNo").click(function () {
                callback(false);
                $("#confirmModal").hide();
            });
        };
        modalConfirm(function (confirm) {
            if (confirm) {
                ShowProgressbar();
                if (delItmID != null) {
                    $http({
                        method: "DELETE",
                        url: "/Product/Delete/" + delItmID,
                    }).then(function (response) {
                        delItmID = null;
                        if (response.data == "success") {
                            window.location.reload(true);
                            ShowModal("Record deleted successfully.");
                        }
                        else {
                            HideProgressbar();
                            ShowModal("Failed to delete record.");
                        }
                    })
                }
            }
        });
    }

});