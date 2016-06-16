'use strict';

(function() {
var module = angular.module('ps2map',[]);

//directives
module.directive('mpMap', function() {
	return {
		restrict: 'E',
		transclude: true,
		template: '<style>.leaflet-container{ background: #051111;}</style><ng-transclude>',
		scope: {
			onClick: '&',
		},
		controller: ['$scope', function($scope) {
			// マーカ等の追加
			this.addLayer = function(layer) {
				console.log('addLayer');
				layer.addTo($scope.map);
			};
			// マーカ等の削除
			this.removeLayer = function(layer) {
				console.log('removeLayer');
				$scope.map.removeLayer(layer);
			};
			console.log('map controller');
		}],
		compile: function compile(elem, attr, transclude) {
			return {
				pre: function preLink(scope, elem, attr, ctrl) {
					console.log('map pre link');
					// 子要素のlinkが行われる前にmapを用意しておき、子要素からマーカの追加を行う
					// https://docs.angularjs.org/api/ng/service/$compile
					scope.map = L.map(elem[0].parentNode , {
						crs: L.CRS.Simple,
						attributionControl: false,
					});
					scope.map.on('click', function(evt) {
						if( scope.onClick ){
							scope.onClick( { 'event': evt } );
						}
					});
					scope.map.fitBounds([
											[0, 0],
											[0, 256],
											[-256, 256],
											[-256, 0]
										]);
				},
				post: function postLink(scope, element, attr, controller) {
					// なし
					console.log('map post link');
				},
			};
		},
	};
});

// タイルレイヤ
module.directive('mpTile', function()  {
	return {
	    require: '^^mpMap',
		restrict: 'E',
		transclude: true,
		scope: {
			urlTemplate: '&',
			tileSize: '&',
			rebuild: '&',
			registerApi: '&',
		},
		bindToController: true,
		controllerAs: 'tileCtrl',
		//-----------------------------------------------------------------------------------------
		controller: ['$scope', function($scope) {
			$scope.self = this;
			var self = $scope.self;
			// rebuild tile layer with new parameter
			self.api = {
				rebuildTile : function(){
					var self = $scope.self;
					// remove existing tile layer from map
					if( self.tile ){
						self.mapCtrl.removeLayer( self.tile );
					}
					console.log(self.urlTemplate());
					self.tile = L.tileLayer( self.urlTemplate(), {
						tileSize: self.tileSize(),
						continuousWorld: true, // バグ対策 :  https://github.com/Leaflet/Leaflet/issues/2776
						minZoom: 1,
						maxZoom: 7,
						maxNativeZoom: 5,
						noWrap: true,		
					});
					self.mapCtrl.addLayer( self.tile );
				},
			};
			
		}],
		//-----------------------------------------------------------------------------------------
		link: function( scope, elem, attr, ctrl) {
			// console.log('tile post link');
			var self = scope.self;
			self.mapElement = elem;
			self.mapCtrl = ctrl;
			self.api.rebuildTile();
			self.registerApi( { 'api': self.api } );
		},
	};
});

//マーカ
module.directive('mpMarker', function() {
	return {
		require: '^^mpMap',
		restrict: 'E',
		scope: {
			lat: "&",
			lng: "&",
			onMove: "&",
			onClick: "&",
		},
		link: function(scope, element, attr, ctrl) {
			// console.log('('+scope.lng()+', ' + scope.lng() +')');
			scope.marker = L.marker( [ scope.lat(), scope.lng() ], {
				draggable: true
			});
			ctrl.addLayer(scope.marker);
	
			// leafletのイベント変数を利用可能
			scope.marker.on('move', function(evt) {
				if( scope.onMove ){
					scope.onMove( { 'event': evt } );
				}
			});
	
			scope.marker.on('click', function(evt) {
				if( scope.onClick ){
					scope.onClick( { 'event': evt } );
				}
			});
			
			element.on('$destroy', function() {
				ctrl.removeLayer(scope.marker);
			});
		},
	};
});

//マーカ
module.directive('mpPanel', function() {
	return {
		restrict: 'E',
		scope: {
		},
		controllerAs: '$panelCtrl',
		controller: function(){
			this.onMapClick = function( event ){
				console.log(event);
			};
			this.onMarkerClick = function( event ){
				
			};
		},
		link: function(scope, element, attr, ctrl) {
		},
	};
});

})();


