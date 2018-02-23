var app = angular.module("myapp", []);
app.controller("ListController", ['$scope','$http', function($scope, $http) {

   /* un-comment code use it while server up and running(like http,...)
   
    $http.get('data.json').then(function(data, status, headers, config) {
        $scope.employeeDetails = data;
    }).
    then(function(data, status, headers, config) {
      
    }); */
    
    
   /* mock data */
    $scope.employeeDetails =  [
        {
                        "name":	"a1",
                        "category":	"C1",
                        "amount":	10
        },
        {
                        "name":	"a3",
                        "category":	"C1",
                        "amount":	30
        },
        {
                        "name":	"a2",
                        "category":	"C1",
                        "amount":	20
        },
        {
                        "name":	"a1",
                        "category":	"C2",
                        "amount":	100
        },
        {
                        "name":	"a6",
                        "category":	"C2",
                        "amount":	600
        },
        {
                        "name":	"a2",
                        "category":	"C2",
                        "amount":	200
        },
        {
                        "name":	"a5",
                        "category":	"C2",
                        "amount":	500
        },
        {
                        "name":	"a1",
                        "category":	"C3",
                        "amount":	1000
        },
        {
                        "name":	"a3",
                        "category":	"C3",
                        "amount":	3000
        },
        {
                        "name":	"a5",
                        "category":	"C3",
                        "amount":	5000
        }
    ];
        /* variables declaration */
        var reA = /[^a-zA-Z]/g;
        var reN = /[^0-9]/g;
        $scope.sortByNameflag = true;
        $scope.sortByCategoryFlag = true;
        $scope.sortByAmountFlag = true;
        
        /* helper function to sortby name
            input: array of objects
            returns: arry of objects
         */
        function sortByNameHelper(empdetails){
            empdetails.sort(function(a,b) {
                var aA = a.name.replace(reA, "");
                var bA = b.name.replace(reA, "");
                if(aA === bA) {
                    var aN = parseInt(a.name.replace(reN, ""), 10);
                    var bN = parseInt(b.name.replace(reN, ""), 10);
                    return aN === bN ? 0 : aN > bN ? 1 : -1;
                } else {
                    return aA > bA ? 1 : -1;
                }
            });
            return empdetails;
        }
        
        /* function to null check ,
            and return c1 category value
         */
        $scope.displayC1Val = function(item){
         return   item.C1&&item.C1[0]&&item.C1[0].amount ?
            item.C1[0].amount :
            '-';           
        }

        /* function to null check ,
            and return c2 category value
         */
        $scope.displayC2Val = function(item){
            return   item.C2&&item.C2[0]&&item.C2[0].amount ?
               item.C2[0].amount :
               '-';              
        }

        /* function to null check ,
            and return c3 category value
         */
        $scope.displayC3Val = function(item){
            return   item.C3&&item.C3[0]&&item.C3[0].amount ?
               item.C3[0].amount :
               '-';              
        }

        /* function to sortby name
            input: array of objects
            returns: arry of objects
         */
        $scope.sortByName = function(empdetails){
            if($scope.sortByNameFlag){
                sortByNameHelper(empdetails);
            }else{
                empdetails.reverse();
            }
        }

        /* function to sortby amount
            input: array of objects
            returns: arry of objects
         */
        $scope.sortByAmount = function(empdetails){
            if($scope.sortByAmountFlag){
                empdetails.sort(function(a, b) {
                    return parseFloat(a.amount) - parseFloat(b.amount);
                });
            }else{
                empdetails.reverse();
            }     
        }


        /* function to sortby category
            input: array of objects
            returns: arry of objects
         */
        $scope.sortByCategory = function(empdetails){
            if($scope.sortByCategoryFlag){
                empdetails.sort(function(a,b) {
                    var aA = a.category.replace(reA, "");
                    var bA = b.category.replace(reA, "");
                    if(aA === bA) {
                        var aN = parseInt(a.category.replace(reN, ""), 10);
                        var bN = parseInt(b.category.replace(reN, ""), 10);
                        return aN === bN ? 0 : aN > bN ? 1 : -1;
                    } else {
                        return aA > bA ? 1 : -1;
                    }
                });
            }else{
                empdetails.reverse();
            }
        }

        /* function to transform data by category
            input: array of objects
            returns: arry of objects
         */
        $scope.parseJsonData = function(details){
            $scope.data = angular.copy(details);

           var parsedJsonObj =  _.chain(sortByNameHelper($scope.data))
            .groupBy("name")
            .pairs()
            .map(function (currentItem) {
                return _.object(_.zip(["name", "empdata"], currentItem));
            })
            .value();

                var parsedJsonObjLength = parsedJsonObj.length;
                for(var i=0;i<parsedJsonObjLength;i++){
                    parsedJsonObj[i].empdata = _.mapObject(_.groupBy(parsedJsonObj[i].empdata, 'category'),
                          clist => clist.map(emp => _.omit(emp, 'category','name')));
                }
                $scope.transformedEmployeeDetails = parsedJsonObj;
            return parsedJsonObj;
        }

        /* function to add new employee details to employeeDetails */
        $scope.addNew = function(employeeDetail){
            $scope.employeeDetails.push({ 
                'name': "", 
                'category': "",
                'amount': "",
            });
        };
    
        /* function to delete employee details from employeeDetails */
        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.employeeDetails, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.employeeDetails = newDataList;
        };
    
    /* function to select all employeeDetails */
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.employeeDetails, function(employeeDetail) {
            employeeDetail.selected = $scope.selectedAll;
        });
    };    
    
    
}]);