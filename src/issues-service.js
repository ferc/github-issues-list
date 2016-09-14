(function() {
  'use strict';

  angular
    .module('githubAPI')
    .constant('GITHUB_REPOS_API', 'https://api.github.com/repos')
    .constant('GITHUB_API_PAGE', 30)
    .constant('OWNER', 'angular')
    .constant('REPO', 'angular')
    .factory('IssuesService', [
      'GITHUB_API_PAGE', 'GITHUB_REPOS_API', 'OWNER', 'REPO', '$http',
      IssuesService
    ])
  ;

  /**
   * @ngdoc service
   * @name IssuesService
   *
   * @description
   * Provides access to the Github Issues API.
   *
   */
  function IssuesService(GITHUB_API_PAGE, GITHUB_REPOS_API, OWNER, REPO, $http) {
    var self = {},
        GITHUB_ISSUES = [
          GITHUB_REPOS_API,
          OWNER,
          REPO,
          'issues'
        ].join('/');

    self.getLastSevenDays = function(page) {
      var date = new Date(),
          lastSevenDays = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));

      page = page || 1;

      return $http
        .get(GITHUB_ISSUES, {
          params: {
            since: lastSevenDays.toISOString(),
            page: page
          }
        })
        .then(function(response) {
          return {
            data: response.data,
            isLastPage: response.data.length < GITHUB_API_PAGE
          };
        })
      ;
    };

    return self;
  };
})();
