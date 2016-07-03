var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Controllers;
        (function (Controllers) {
            var MainController = (function () {
                function MainController($interval, $location, $routeParams) {
                    var _this = this;
                    this.$interval = $interval;
                    this.$location = $location;
                    this.$routeParams = $routeParams;
                    this.remainingSeconds = 5;
                    this.countdown = function () {
                        var controller = _this;
                        controller.remainingSeconds -= 1;
                        if (controller.remainingSeconds < 1) {
                            controller.searchUser(controller.searchedUserName);
                        }
                    };
                    var controller = this;
                    controller.countdownInterval = controller
                        .$interval(controller.countdown, 1000, controller.remainingSeconds);
                }
                MainController.prototype.searchUser = function (searchedUserName) {
                    if (this.countdownInterval) {
                        this.$interval.cancel(this.countdownInterval);
                        this.remainingSeconds = null;
                    }
                    if (searchedUserName !== undefined && searchedUserName !== "") {
                        this.$location.path("/user/" + searchedUserName);
                    }
                };
                MainController.prototype.nvl = function (inputData, replaceData) {
                    if (inputData === undefined || inputData === null) {
                        return replaceData === undefined ? "" : replaceData;
                    }
                    else {
                        return inputData;
                    }
                };
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
                MainController.$inject = ["$interval", "$location", "$routeParams"];
                return MainController;
            }());
            Controllers.MainController = MainController;
            angular
                .module("app.Angular.Controllers")
                .controller("MainController", ["$interval", "$location", "$routeParams", MainController]);
        })(Controllers = Angular.Controllers || (Angular.Controllers = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
