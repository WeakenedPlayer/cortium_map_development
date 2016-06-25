'use strict';

PS2MAP.directive('mpMap', function() {
	return {
		restrict: 'E',
		transclude: true,
		template: '<style>.leaflet-container{ background: #051111;}</style><ng-transclude>',
		scope: {
			onClick: '&',
		},
		bindToController: true,
		controllerAs: 'mpMapCtrl',
		controller: ['$scope', function($scope) {
			console.log('map controller');
			$scope.self = this;
			var self = $scope.self;
			console.log(self.onClick);
			// マーカ等の追加
			self.addLayer = function( layer ) {
				layer.addTo( self.map );
			};
			// マーカ等の削除
			self.removeLayer = function( layer ) {
				self.map.removeLayer( layer );
			};
		}],
		compile: function compile( elem, attr, transclude ) {
			console.log( 'map compile' );
			return {
				pre: function preLink( scope, elem, attr, ctrl ) {
					var self = scope.self;
					console.log('map pre link');
					// 子要素のlinkが行われる前にmapを用意しておき、子要素からマーカの追加を行う
					// https://docs.angularjs.org/api/ng/service/$compile
					self.map = L.map( elem[0].parentNode, {
						crs: L.CRS.Simple,
						attributionControl: false,
					});
					self.map.on( 'click', function( evt ) {
						console.log(self.onClick);
						if( self.onClick ){
							self.onClick( { 'event': evt } );
						}
					});
					self.map.fitBounds([
											[0, 0],
											[0, 256],
											[-256, 256],
											[-256, 0]
										]);
				},
				post: function postLink() {
					// console.log('map post link');
				},
			};
		},
	};
});

