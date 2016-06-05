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
				layer.addTo($scope.map);
			};
			// マーカ等の削除
			this.removeLayer = function(layer) {
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
					});
					scope.map.on('click', function(evt) {
						if( scope.onClick ){
							scope.onClick( { 'event': evt } );
						}
					});
					scope.map.fitBounds([
											[0, 0],
											[0, 512],
											[-512, 512],
											[-512, 0]
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
		},
		controller: ['$scope', function($scope) {
		}],
		link: function(scope, elem, attr, ctrl) {
			console.log('tile post link');
			scope.tile = L.tileLayer('https://raw.githubusercontent.com/WeakenedPlayer/resource/master/map/indar/{z}/{y}/{x}.jpg', {
				tileSize: 256,
				continuousWorld: true, // バグ対策 :  https://github.com/Leaflet/Leaflet/issues/2776
				attributionControl: false,
				attribution: 'test',
				zoomReverse: true,
				minZoom: 0,
				maxZoom: 4,
				noWrap: true,
			});
			ctrl.addLayer( scope.tile );
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
			scope.marker = L.marker([scope.lat(), scope.lng()], {
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

})();


