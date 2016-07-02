/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />
/// <reference path="../Models/Person.ts" />
declare var $: JQueryStatic;

namespace app.Angular.Controllers {

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

    export class MainController implements app.Angular.ControllerContracts.IAngularController {
        title: string;
        private _message: string;
        person: app.core.Models.Person;
        gitPerson: any;
        private _searchedUserName: string;
        private _gravatarLink: string = "http://www.gravatar.com/avatar/";
        repoSortOrder: string = "-stargazers_count";
        repos: any;

        static $inject = ["PersonService"];
        constructor( private personService: app.Angular.Services.PersonService) {
            var controller = this;

            controller.title = "Main Controller";
            controller.fetchUserData();
        }

        public fetchUserData = () => {
            var controller = this;
            controller.personService.fetchUserData()
                .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                    this.userDataCallback(response.data);
                })
        }

        public searchUser(searchedUserName: string): void {
            this.personService.fetchUserDataPromiseForUser(searchedUserName)
                .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                    this.personService.fetchReposData(response.data.repos_url)
                        .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                        this.repos = response.data;
                    })
                });
        }

        nvl(inputData: any, replaceData?: any): any {
            if (inputData === undefined || inputData === null) {
                return replaceData === undefined ? "" : replaceData;
            } else {
                return inputData;
            }
        }

        public userDataCallback = (data: any) => {
            var controller = this;
            if ($.type(data) === "string") {
                controller.message = data;
            } else {
                controller.gitPerson = data;
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