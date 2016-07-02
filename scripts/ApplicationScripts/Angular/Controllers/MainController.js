/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />
/// <reference path="../Models/Person.ts" />
var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Controllers;
        (function (Controllers) {
            // var ctrlModule = angular.module('app.Angular.Controllers');
            // export class MainControllerSearchDirective implements ng.IDirective {
            //     public restrict: string = "E";
            //     public replace: boolean = true;
            //     public controller: string = 'MainController';
            //     public controllerAs: string = 'main';
            //     public scope = {};
            // }
            // ctrlModule.directive("mainCtrlSearch", [() => new app.Angular.Controllers.MainControllerSearchDirective()]);
            // export interface ISearchScope extends ng.IScope {
            //     mainCtrl: MainController;
            //     searchResult: any;
            // }
            var MainController = (function () {
                function MainController(personService) {
                    var _this = this;
                    this.personService = personService;
                    this._gravatarLink = "http://www.gravatar.com/avatar/";
                    this.repoSortOrder = "-stargazers_count";
                    this.fetchUserData = function () {
                        var controller = _this;
                        controller.personService.fetchUserData()
                            .then(function (response) {
                            _this.userDataCallback(response.data);
                        });
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
                }
                MainController.prototype.searchUser = function (searchedUserName) {
                    var _this = this;
                    this.personService.fetchUserDataPromiseForUser(searchedUserName)
                        .then(function (response) {
                        _this.personService.fetchReposData(response.data.repos_url)
                            .then(function (response) {
                            _this.repos = response.data;
                        });
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
                MainController.$inject = ["PersonService"];
                return MainController;
            }());
            Controllers.MainController = MainController;
            angular
                .module("app.Angular.Controllers")
                .controller("MainController", MainController);
        })(Controllers = Angular.Controllers || (Angular.Controllers = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
