/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />
/// <reference path="../Models/Person.ts" />
declare var $: JQueryStatic;

namespace app.Angular.Controllers {

    class MainController implements app.Angular.ControllerContracts.IAngularController {
        title: string;
        private _message: string;
        person: app.core.Models.Person;
        gitPerson;
        private _searchedUserName: string;
        private _gravatarLink: string = "http://www.gravatar.com/avatar/";
        repoSortOrder: string = "-stargazers_count";
        controllerInstance = this;

        static $inject = ["PersonService"];
        constructor(private personService: app.Angular.Services.PersonService) {
            var controller = this;

            controller.title = "Main Controller";
            // controller.fetchUserDataPromise(userDataCallback);

            function userDataCallback(data: any) {
                if ($.type(data) === "string") {
                    controller.message = data;
                } else {
                    controller.gitPerson = data;
                }
            }
        }

        fetchUserDataPromise(successCallback: Function): void {
            this.personService.fetchUserDataHttp().success(function (data, status) {
                successCallback(data);
            })
        }

        searchUser(searchedUserName: string): void {
            // var service = new app.Angular.Services.PersonService("$http");
            // var controller = new MainController(service);
            this.personService.fetchUserDataPromiseForUser(searchedUserName).success(function (data, status) {
                controllerInstance.userDataCallback(data); //ovdje jebemu
            })
        }

        nvl(inputData: any, replaceData?: any): any {
            if (inputData === undefined || inputData === null) {
                return replaceData === undefined ? "" : replaceData;
            } else {
                return inputData;
            }
        }

        userDataCallback(data: any) {
                if ($.type(data) === "string") {
                    this.message = data;
                } else {
                    this.gitPerson = data;
                }
        }

        get gravatarLink(): string {
            if (this.gitPerson !== undefined) {
                let url: string;
                if (this.gitPerson !== undefined
                    && this.gitPerson.gravatar_id !== undefined
                    && this.gitPerson.gravatar_id !== ""
                ) {
                    url = this._gravatarLink + this.gitPerson.gravatar_id;
                } else {
                    url = this.gitPerson.avatar_url;
                }
                return url;
            } else {
                return "";
            }
        }

        get message(): string {
            return "Hello " + this.searchedUserName + "!";
        }

        set message(message: string) {
            this._message = message;
        }

        get searchedUserName(): string {
            return this.nvl(this._searchedUserName);
        }
        set searchedUserName(userName: string) {
            this._searchedUserName = userName;
        }
    }

    angular
        .module("app.Angular.Controllers")
        .controller("MainController", MainController);
}