(function() {
  'use strict';

  angular
    .module('githubAPI', [])
    .controller('IssuesController', ['IssuesService', '$scope', IssuesController])
  ;

   /**
    * @ngdoc type
    * @name IssuesController
    *
    * @description
    * The `IssuesController` contains the issues business logic (interaction with
    * IssuesService).
    *
    */
  function IssuesController(IssuesService, $scope) {
    var page = 1;

    function loadMore() {
      $scope.loading = true;

      IssuesService
        .getLastSevenDays(page)
        .then(function(response) {
          $scope.issues = $scope.issues.concat(response.data || []);
          $scope.completed = response.isLastPage;
          page++;
        })
        .finally(function() {
          $scope.loading = false;
        })
      ;
    }

    $scope.completed = false;
    $scope.loading = false;
    $scope.issues = [];
    $scope.loadMore = loadMore;

    loadMore();
  };
})();
