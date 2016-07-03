declare var $: JQueryStatic;

namespace app.Angular.Controllers {

    export class MainController {
        private _searchedUserName: string;
        remainingSeconds: number = 5;
        countdownInterval;


        static $inject = ["$interval", "$location", "$routeParams"];
        constructor(
            private $interval: ng.IIntervalService,
            private $location: ng.ILocationService,
            private $routeParams: ng.route.IRouteProvider
        ) {
            var controller = this;

            controller.countdownInterval = controller
                .$interval(controller.countdown, 1000, controller.remainingSeconds);
        }

        public searchUser(searchedUserName: string): void {
            if (this.countdownInterval) {
                this.$interval.cancel(this.countdownInterval);
                this.remainingSeconds = null;
            }
            if(searchedUserName !== undefined && searchedUserName !== ""){
                this.$location.path("/user/" + searchedUserName);
            }
        }

        public countdown = () => {
            var controller = this;
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

        get searchedUserName(): string {
            return this.nvl(this._searchedUserName);
        }
        set searchedUserName(userName: string) {
            this._searchedUserName = userName;
        }
    }

    angular
        .module("app.Angular.Controllers")
        .controller("MainController", ["$interval", "$location", "$routeParams", MainController]);
}