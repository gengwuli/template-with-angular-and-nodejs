;
(function() {
    angular
        .module('app')
        .controller('state2Ctrl', state2Ctrl)

    state2Ctrl.$inject = ['$scope', 'api']

    function state2Ctrl($scope, api) {
        $scope.editorOptions = {
            lineWrapping: true,
            theme: 'eclipse',
            mode: 'text/x-java',
            matchBrackets: true,
            htmlMode: true
        };


        //using XMLHttpRequest to fetch data from the back directly
        //get '(intermediate value)(intermediate value)
        //(intermediate value)(intermediate value)(intermediate value) 
        //is not a function' error if not semicolon present
        //(function() {})() ; (function() {})()
        // ; (function() {
        //     var oReq = new XMLHttpRequest();
        //     oReq.addEventListener("load", function() {
        //         $scope.binary = oReq.responseText;
        //     });
        //     oReq.open("GET", "http://localhost:3111/xmlbin");
        //     oReq.send();
        // })()


        //using angular resource
        ; (function() {
            api.getStub().$promise.then(function(result) {
                console.log(result.binary)
                $scope.binary = result.binary
            });
        })()
    }
})()
