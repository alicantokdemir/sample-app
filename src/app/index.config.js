(function () {
  'use strict';

  angular
    .module('sample')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastr, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-center';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    // http interceptor adding header for every request to the localhost
    $httpProvider.interceptors.push(function () {
      return {
        'request': function (config) {
          if (config.url.indexOf('http://') === -1 || config.url.indexOf('localhost') > -1) {
            config.headers['Meplis-Security-Server'] = 'xpto-belgium';
          }
          return config;
        }
      };
    });
  }

})();
