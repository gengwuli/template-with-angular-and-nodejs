# template-with-angular-and-nodejs
A template that incorporate angular, bootstrap, ui-codemirror, code beautifier, ng-resource, ui-router, and nodejs as backend

## How to use
* npm install (install all dependencies)
* python -m SimpleHTTPServer 8080 (in frontend folder)
* node index.js (in backend folder)
* open a browser, go to http://localhost:8080


## Note:
1. How to use **ui-codemirror**? (Remember to add dependency to angular module ui.codemirror)
	* Include one by one
		* codemirror/lib/codemirror.css,  
		* codemirror/theme/eclipse.css, 
		* codemirror/lib/codemirror.js,
		* codemirror/mode/javascript/javascript.js, 
		* codemirror/mode/clike/clike.js, 
		* angular-ui-codemirror/ui-codemirror.js; 
	> (xml.js is for different effects, clike.js is for different mode if you want to use 'java' as the mode)
	    
	* Add following tag to html file
	```html
	<ui-codemirror ui-codemirror-opts="editorOptions" ng-model="model"></ui-codemirror>
	```
	  
	* Configure options in controller (Either in $scope.editorOptions or vm.editorOption)
	```javascript
	      editorOptions = {
	          lineWrapping: true,
	          theme: 'eclipse',
	          mode: 'text/x-java',
	          matchBrackets: true,
	          htmlMode: true
	      }
	```

2. How to use **prismjs** in ui-view
	* Customize your prismjs at [prism](http://prismjs.com/download.html)
	
	* Add prism.js and prism.css to index.html
	
	* Create an angular directive 
	```javascript
	.directive('ngPrism', function() {
	  return {
	      restrict: 'A',
	      link: function(scope, element, attrs) {
	          Prism.highlightElement(element.find('code')[0]);
	      }
	  }
	})
	```
	* Create a filter
	```javascript
	.filter('unsafe', ['$sce', function($sce) {
	    return $sce.trustAsHtml;
	}])
	```
	* Add tag to file (line-numbers are showing line number and data-line highlight which line, specify when downloading)
	```
	<div ng-prism>
	  <pre class="line-numbers" data-line="2"><code class="language-java"><span ng-bind-html="kmp | unsafe"></span></code></pre>
	</div>
	```
      
3. How to use **ui-router**? (remember to add ui-router to module)
	* Configure ui-router in module
	```javascript
	config.$inject = ['$stateProvider', '$urlRouterProvider']
	    function config($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/state1");
	// Now set up the states
	$stateProvider
	    .state('state1', {
	        url: "/state1",
	        templateUrl: "app/state1.html",
	        controller: "state1Ctrl as vm"
	    })
	    .state('state2', {
	        url: "/state2",
	        templateUrl: "app/state2.html",
	        controller: 'state2Ctrl as vm'
	    })
	}
	```
	* Add **ui-sref** to a tag
	```html
	<a href="#" ui-sref="state1">link2(go to state1 which is shown in url)</a>
	```
	> (when clicked it will go to ui state reference stat1 which matches what defined in config)


   
    
