var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Controllers;
        (function (Controllers) {
            var RepoController = (function () {
                function RepoController(GitHubService, $routeParams) {
                    this.GitHubService = GitHubService;
                    this.$routeParams = $routeParams;
                    var controller = this;
                    controller.repoName = controller.$routeParams.reponame;
                    controller.userName = controller.$routeParams.username;
                    controller.GitHubService.fetchRepoDetails(controller.userName, controller.repoName)
                        .then(function (response) {
                        controller.repository = response;
                    });
                }
                RepoController.$inject = ["$routeParams", "GitHubService"];
                return RepoController;
            }());
            Controllers.RepoController = RepoController;
            angular
                .module("app.Angular.Controllers")
                .controller("RepoController", ["$routeParams", "GitHubService", RepoController]);
        })(Controllers = Angular.Controllers || (Angular.Controllers = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
