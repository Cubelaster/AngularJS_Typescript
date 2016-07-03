declare var $: JQueryStatic;

namespace app.Angular.Controllers {

    interface IRepoParams extends ng.route.IRouteParamsService {
        reponame: string;
        username: string;
    }

    export class RepoController {
        repoName: string;
        userName: string;
        repository: any;

        static $inject = ["$routeParams", "GitHubService"];
        constructor(
            private GitHubService: app.Angular.Services.GitHubService,
            private $routeParams: IRepoParams
        ) {
            var controller = this;
            controller.repoName = controller.$routeParams.reponame;
            controller.userName = controller.$routeParams.username;
            controller.GitHubService.fetchRepoDetails(controller.userName, controller.repoName)
                .then((response: any) => {
                    controller.repository = response;
                })
        }
    }

    angular
        .module("app.Angular.Controllers")
        .controller("RepoController", ["$routeParams", "GitHubService", RepoController]);

}