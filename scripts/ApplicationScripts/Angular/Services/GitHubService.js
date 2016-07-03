var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Services;
        (function (Services) {
            var GitHubService = (function () {
                function GitHubService($http) {
                    this.$http = $http;
                    this.callbackFunctionResponse = function (response) {
                        return response.data;
                    };
                    this.callbackFunctionData = function (data) {
                        return data;
                    };
                    var service = this;
                }
                /**Fetches the Angular data from the https://api.github.com/users/angular link. */
                GitHubService.prototype.fetchAngularData = function () {
                    return this.makeGetRequest('https://api.github.com/users/angular');
                };
                GitHubService.prototype.fetchUserDataForUser = function (searchedUser) {
                    var url = 'https://api.github.com/users/' + searchedUser;
                    return this.makeGetRequest(url);
                };
                /**
                 * Service method for data fetching.
                 * The data is fetched from remote GitHub location.
                 * If the provided string is empty, the fetchAngularData
                 * method is invoked, otherwise the fetchUserDataPromiseForUser
                 * is invoked.
                 */
                GitHubService.prototype.fetchUserData = function (userString) {
                    if (userString === undefined || userString.length === 0) {
                        return this.fetchAngularData().then(this.callbackFunctionData);
                    }
                    else {
                        return this.fetchUserDataForUser(userString).then(this.callbackFunctionData);
                    }
                };
                /**First fetches a promise for the user data, and then from that data returns
                 * the repo data throgh @fetchReposData
                 */
                GitHubService.prototype.fetchReposForUser = function (user) {
                    var _this = this;
                    return this.fetchUserData(user)
                        .then(function (response) {
                        return _this.fetchReposData(response.repos_url)
                            .then(_this.callbackFunctionData);
                    });
                };
                /**Fetches the repositories data for a link(user). */
                GitHubService.prototype.fetchReposData = function (repoLink) {
                    return this.makeGetRequest(repoLink);
                };
                GitHubService.prototype.fetchRepoDetails = function (username, reponame) {
                    var service = this;
                    var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
                    return service.$http.get(repoUrl)
                        .then(function (response) {
                        service.repo = response.data;
                        return service.$http.get(repoUrl + repoUrl + "/collaborators");
                    })
                        .then(function (response) {
                        service.repo.collaborators = response.data;
                        return service.repo;
                    });
                };
                /**Small helper method for doing get() function. */
                GitHubService.prototype.makeGetRequest = function (request) {
                    return this.$http.get(request)
                        .then(this.callbackFunctionResponse)
                        .then(this.callbackFunctionData);
                };
                GitHubService.$inject = ["$http"];
                return GitHubService;
            }());
            Services.GitHubService = GitHubService;
            angular
                .module("app.Angular.Services")
                .service("GitHubService", GitHubService);
        })(Services = Angular.Services || (Angular.Services = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
