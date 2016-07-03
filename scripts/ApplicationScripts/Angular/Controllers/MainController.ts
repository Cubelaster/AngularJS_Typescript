/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />
/// <reference path="../Models/Person.ts" />
declare var $: JQueryStatic;

namespace app.Angular.Controllers {

    export class MainController implements app.Angular.ControllerContracts.IAngularController {
        title: string;
        private _message: string;
        person: app.core.Models.Person;
        gitPerson: any;
        private _searchedUserName: string;
        private _gravatarLink: string = "http://www.gravatar.com/avatar/";
        repoSortOrder: string = "-stargazers_count";
        repos: any;
        remainingSeconds: number = 5;
        countdownInterval;


        static $inject = ["GitHubService", "$interval", "$log",
            "$anchorScroll", "$location"];
        constructor(
            private gitHubService: app.Angular.Services.GitHubService,
            private $interval: ng.IIntervalService,
            private $log: ng.ILogService,
            private $anchorScroll: ng.IAnchorScrollService,
            private $location: ng.ILocationService
        ) {
            var controller = this;

            controller.title = "Main Controller";
            controller.fetchUserData();
            controller.countdownInterval = controller
                .$interval(controller.countdown, 1000, controller.remainingSeconds);
        }

        public fetchUserData = () => {
            var controller = this;
            controller.gitHubService.fetchUserData()
                .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                    this.userDataCallback(response);
                })
        }

        public searchUser(searchedUserName: string): void {
            this.$log.info("Searching for " + searchedUserName);
            if (this.countdownInterval) {
                this.$interval.cancel(this.countdownInterval);
                this.remainingSeconds = null;
            }
            this.gitHubService.fetchReposForUser(searchedUserName)
                .then((response: any) => {
                    this.repos = response;
                    this.$location.hash("userDetails");
                    this.$anchorScroll();
                })
        }

        public countdown = () => {
            var controller = this;
            console.log(controller.remainingSeconds);
            controller.remainingSeconds -= 1;
            if (controller.remainingSeconds < 1) {
                controller.searchUser(controller.searchedUserName);
            }
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
        .controller("MainController", ["GitHubService", "$interval",
            "$log", "$anchorScroll", "$location", MainController]);
}