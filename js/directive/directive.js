app.directive('ngComment', function() {
	
	return {
		scope: {
			comment: '='
		},
		restrict: 'E',
		templateUrl: 'partials/_comment.html'
	}
})


app.directive('ngTabs', function() {
	return {
		restrict: 'E', 
		transclude: true,
		templateUrl: 'directive/tabs.html',
		scope: {

		},
		controller: function($scope) {
			
			$scope.tabs = [];

			$scope.select = function(tab) {
				
				angular.forEach($scope.tabs, function(t) {
					t.selected = false;
				});

				tab.selected = true;
			};

			this.add = function(tab) {
				if($scope.tabs.length == 0) {
					$scope.select(tab);
				}
				$scope.tabs.push(tab);
			}
		}
	}
});

app.directive('ngTab', function() {
	return {
		restrict: 'E', 
		transclude: true,
		scope: {
			title: '@'
		},
		templateUrl: 'directive/tab.html',
		require: '^ngTabs',
		link: function(scope, element, attrs, tabsCtrl) {
			scope.selected = false;
			tabsCtrl.add(scope);
		}
	}
});



app.directive('ngTest', function() {
	return {
		template: "<div>Salut <strong>{{username}}</strong><div ng-transclude></div></div>",
		restrict: 'A',
		transclude: true,
		scope: {
			username: '='
		}
	}
});


// Directive jqueryyyyyyyyyyyyy date picker
app.directive('datepicker', function() {
	return {
		restrict: 'C',
		scope: {
			'options': '=datepickerOptions'
		},
		link: function (scope, element, attrs) {
			$(element).pickadate(scope.options);
		}
	}
});


app.directive('time', function(dateFilter, $interval) {
	return {
		restrict: 'E',
		template: '{{time}}',
		scope: {},
		link: function(scope, element, attrs) {
			scope.time = dateFilter(new Date(), 'hh:mm:ss');

			element.on('$destroy', function() {
				$interval.cancel(interval);
			})

			interval = $interval(function() {
				scope.time = dateFilter(new Date(), 'hh:mm:ss');
				console.log('time changed');
			}, 1000)
		}
	}
})
