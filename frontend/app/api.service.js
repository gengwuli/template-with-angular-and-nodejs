;
(function() {
    angular
        .module('app')
        // replace this when you deploy it on cloud, remember whether it's https or simple http
//        .constant('apiURL', 'https://jobsback.herokuapp.com')
         .constant('apiURL', 'http://localhost:3111')
         // create a factory api and attach it to app module so that other controllers can use it
        .factory('api', apiService)

    apiService.$inject = ['$http', '$resource', 'apiURL']

    function apiService($http, $resource, apiURL) {
        $http.defaults.withCredentials = true;
        // replace the endpoint with hello, pass extra from payload {extra: "new extra"}
        return $resource(apiURL + '/:endpoint/:extra', { extra: '@extra'}, {
                getStub: {method: 'GET', params: {endpoint: 'stub'}},
                posStub: {method: 'POST', params: {endpoint: 'stub'}}
            }
        )
    }
})()
