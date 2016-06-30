/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />
/// <reference path="../Models/Person.ts" />
var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Controllers;
        (function (Controllers) {
            var MainController = (function () {
                function MainController(personService) {
                    this.personService = personService;
                    this._gravatarLink = "http://www.gravatar.com/avatar/";
                    this.repoSortOrder = "-stargazers_count";
                    this.controllerInstance = this;
                    var controller = this;
                    controller.title = "Main Controller";
                    // controller.fetchUserDataPromise(userDataCallback);
                    function userDataCallback(data) {
                        if ($.type(data) === "string") {
                            controller.message = data;
                        }
                        else {
                            controller.gitPerson = data;
                        }
                    }
                }
                MainController.prototype.fetchUserDataPromise = function (successCallback) {
                    this.personService.fetchUserDataHttp().success(function (data, status) {
                        successCallback(data);
                    });
                };
                MainController.prototype.searchUser = function (searchedUserName) {
                    // var service = new app.Angular.Services.PersonService("$http");
                    // var controller = new MainController(service);
                    this.personService.fetchUserDataPromiseForUser(searchedUserName).success(function (data, status) {
                        this.controllerInstance.userDataCallback(data);
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
                MainController.prototype.userDataCallback = function (data) {
                    if ($.type(data) === "string") {
                        this.message = data;
                    }
                    else {
                        this.gitPerson = data;
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
                MainController.$inject = ["PersonService"];
                return MainController;
            }());
            angular
                .module("app.Angular.Controllers")
                .controller("MainController", MainController);
        })(Controllers = Angular.Controllers || (Angular.Controllers = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
