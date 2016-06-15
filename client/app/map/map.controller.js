'use strict';

(function(){

var module = angular.module('map2App');

module.component('map', {
	templateUrl: 'app/map/map.html',
	controllerAs: '$mapCtrl',
	controller: ['$scope', 'coriumService', function( $scope, coriumService ){
		// data to bind
		$scope.selectedCortium = undefined;
		$scope.cortiums = [];
		
		// not for bind
		this.urlTemplate = 'https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/indar/{z}/{y}/{x}.jpg';

		this.update = function(){
			coriumService.getCortiums().then( function( res ){
				$scope.cortiums = [];
				for( var i=0; i < res.data.length; i++ ){
					$scope.cortiums.push( { lat: 256*res.data[i].lat, lng: 256*res.data[i].lng } );
					console.log("test");
				}
			});
		};
		this.onClickMarker = function( event ){
				$http.post("/api/cortiums", {
					continent:1, 
					lat: event.latlng.lat/512,
					lng: event.latlng.lng/512,
					grade: 2
				});
			};
		this.onClickMap = function( event ){
			$http.post("/api/cortiums", {
				continent:1, 
				lat: event.latlng.lat/512,
				lng: event.latlng.lng/512,
				grade: 2
			});
		};
	}],
});

module.service( 'coriumService', [ '$http', function($http) {
    this.saveCortium = function( cortium ) {
        return $http.post('/api/cortiums', cortium);
    };
    this.getCortiums = function() {
        return $http.get('/api/cortiums');
    };
    this.getCortium = function( id ) {
        return $http.get('/api/cortiums/' + id);
    };
}]);

})();


