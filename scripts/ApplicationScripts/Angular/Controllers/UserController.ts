declare var $: JQueryStatic;

namespace app.Angular.Controllers {

    interface IUserParams extends ng.route.IRouteParamsService {
        username: string;
    }

    export class UserController {
        private _searchedUserName: string;
        repos: any;
        user: any;
        repoSortOrder: string = "-stargazers_count";

        static $inject = ["GitHubService", "$routeParams"];
        constructor( private gitHubService: app.Angular.Services.GitHubService,
                     private $routeParams: IUserParams
                     ) {
            var controller = this;
            controller.searchedUserName = controller.$routeParams.username;
            controller.gitHubService.fetchUserData('angular').then((response: any) => {
                controller.user = response;
            })
            controller.gitHubService.fetchReposForUser(controller.searchedUserName)
                .then((response: any) => {
                    controller.repos = response;
                });
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
        .controller("UserController", ["GitHubService", "$routeParams", UserController]);
}