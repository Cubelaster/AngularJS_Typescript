var app;
(function (app) {
    var services = angular.module("app.Angular.Services", []);
    var main = angular.module("app.Angular.Ctrls", [
        "app.Angular.Services"
    ]);
    var Controllers = angular.module("app.Angular.Controllers", [
        "ngRoute",
        "app.Angular.Services"
    ]);
    Controllers.config(routeConfig);
    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider) {
        $routeProvider
            .when("/main", {
            templateUrl: "Views/Main.html",
            controller: "MainController as main"
        })
            .when("/user/:username", {
            templateUrl: "Views/User.html",
            controller: "UserController as userCtrl"
        })
            .when("/user/:username/:reponame", {
            templateUrl: "Views/Repo.html",
            controller: "RepoController as repoCtrl"
        })
            .otherwise("/main");
    }
})(app || (app = {}));
