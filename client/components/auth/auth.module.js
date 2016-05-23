'use strict';

angular.module('map2App.auth', ['map2App.constants', 'map2App.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
