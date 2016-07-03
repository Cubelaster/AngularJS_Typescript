/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />
/// <reference path="../Models/Person.ts" />
var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Controllers;
        (function (Controllers) {
            var MainController = (function () {
                function MainController(gitHubService, $interval, $log, $anchorScroll, $location) {
                    var _this = this;
                    this.gitHubService = gitHubService;
                    this.$interval = $interval;
                    this.$log = $log;
                    this.$anchorScroll = $anchorScroll;
                    this.$location = $location;
                    this._gravatarLink = "http://www.gravatar.com/avatar/";
                    this.repoSortOrder = "-stargazers_count";
                    this.remainingSeconds = 5;
                    this.fetchUserData = function () {
                        var controller = _this;
                        controller.gitHubService.fetchUserData()
                            .then(function (response) {
                            _this.userDataCallback(response);
                        });
                    };
                    this.countdown = function () {
                        var controller = _this;
                        console.log(controller.remainingSeconds);
                        controller.remainingSeconds -= 1;
                        if (controller.remainingSeconds < 1) {
                            controller.searchUser(controller.searchedUserName);
                        }
                    };
                    this.userDataCallback = function (data) {
                        var controller = _this;
                        if ($.type(data) === "string") {
                            controller.message = data;
                        }
                        else {
                            controller.gitPerson = data;
                        }
                    };
                    var controller = this;
                    controller.title = "Main Controller";
                    controller.fetchUserData();
                    controller.countdownInterval = controller
                        .$interval(controller.countdown, 1000, controller.remainingSeconds);
                }
                MainController.prototype.searchUser = function (searchedUserName) {
                    var _this = this;
                    this.$log.info("Searching for " + searchedUserName);
                    if (this.countdownInterval) {
                        this.$interval.cancel(this.countdownInterval);
                        this.remainingSeconds = null;
                    }
                    this.gitHubService.fetchReposForUser(searchedUserName)
                        .then(function (response) {
                        _this.repos = response;
                        _this.$location.hash("userDetails");
                        _this.$anchorScroll();
                    });
                };
                MainController.prototype.nvl = function (inputData, replaceData) {
                    if (inputData === undefined || inputData === null) {
                        return replaceData === undefined ? "" : replaceData;
                    }
                    else {
                        return inputData;
                    }
                };
                Object.defineProperty(MainController.prototype, "gravatarLink", {
                    get: function () {
                        if (this.gitPerson !== undefined) {
                            var url = void 0;
                            if (this.gitPerson !== undefined
                                && this.gitPerson.gravatar_id !== undefined
                                && this.gitPerson.gravatar_id !== "") {
                                url = this._gravatarLink + this.gitPerson.gravatar_id;
                            }
                            else {
                                url = this.gitPerson.avatar_url;
                            }
                            return url;
                        }
                        else {
                            return "";
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MainController.prototype, "message", {
                    get: function () {
                        return "Hello " + this.searchedUserName + "!";
                    },
                    set: function (message) {
                        this._message = message;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MainController.prototype, "searchedUserName", {
                    get: function () {
                        return this.nvl(this._searchedUserName);
                    },
                    set: function (userName) {
                        this._searchedUserName = userName;
                    },
                    enumerable: true,
                    configurable: true
                });
                MainController.$inject = ["GitHubService", "$interval", "$log",
                    "$anchorScroll", "$location"];
                return MainController;
            }());
            Controllers.MainController = MainController;
            angular
                .module("app.Angular.Controllers")
                .controller("MainController", ["GitHubService", "$interval",
                "$log", "$anchorScroll", "$location", MainController]);
        })(Controllers = Angular.Controllers || (Angular.Controllers = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
