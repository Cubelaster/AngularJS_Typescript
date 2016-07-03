var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Controllers;
        (function (Controllers) {
            var UserController = (function () {
                function UserController(gitHubService, $routeParams) {
                    this.gitHubService = gitHubService;
                    this.$routeParams = $routeParams;
                    this.repoSortOrder = "-stargazers_count";
                    var controller = this;
                    controller.searchedUserName = controller.$routeParams.username;
                    controller.gitHubService.fetchUserData('angular').then(function (response) {
                        controller.user = response;
                    });
                    controller.gitHubService.fetchReposForUser(controller.searchedUserName)
                        .then(function (response) {
                        controller.repos = response;
                    });
                }
                UserController.prototype.nvl = function (inputData, replaceData) {
                    if (inputData === undefined || inputData === null) {
                        return replaceData === undefined ? "" : replaceData;
                    }
                    else {
                        return inputData;
                    }
                };
                Object.defineProperty(UserController.prototype, "searchedUserName", {
                    get: function () {
                        return this.nvl(this._searchedUserName);
                    },
                    set: function (userName) {
                        this._searchedUserName = userName;
                    },
                    enumerable: true,
                    configurable: true
                });
                UserController.$inject = ["GitHubService", "$routeParams"];
                return UserController;
            }());
            Controllers.UserController = UserController;
            angular
                .module("app.Angular.Controllers")
                .controller("UserController", ["GitHubService", "$routeParams", UserController]);
        })(Controllers = Angular.Controllers || (Angular.Controllers = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
