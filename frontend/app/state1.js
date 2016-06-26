;
(function() {
    angular
        .module('app')
        .controller('state1Ctrl', state1Ctrl)
        //create this directive so that prism works in ui-view
        .directive('ngPrism', ngPrism)
        //create this filter so that we can render string as html without trustAsHtml error
        .filter('unsafe', ['$sce', function($sce) {
            return $sce.trustAsHtml;
        }])

    state1Ctrl.$inject = ['$scope', 'api']

    function state1Ctrl($scope, api) {

        // //using XMLHttpRequest to fetch data from the back directly
        //    ; (function() {
        //        var oReq = new XMLHttpRequest();
        //        oReq.addEventListener("load", function() {
        //        	$scope.kmp = Prism.highlight(oReq.responseText, Prism.languages.javascript);
        //        });
        //        oReq.open("GET", "http://localhost:3111/xmlkmp");
        //        oReq.send();
        //    })()

        //using angular resource to fetch data from back end
        ; (function() {
            api.getStub().$promise.then(function(result) {
                var kmp = result.kmp;
                $scope.kmp = Prism.highlight(kmp, Prism.languages.javascript);
            });
        })()
    }

    function ngPrism() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                Prism.highlightElement(element.find('code')[0]);
            }
        }
    }
})()
