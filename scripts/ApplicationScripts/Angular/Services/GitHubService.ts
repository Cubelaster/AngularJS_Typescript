namespace app.Angular.Services {

    export class GitHubService
        implements app.Angular.ServiceContracts.IGitHubService {

         repo: any;

        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) {
            var service = this;
        }
        /**Fetches the Angular data from the https://api.github.com/users/angular link. */
        fetchAngularData(): any {
            return this.makeGetRequest('https://api.github.com/users/angular');
        }

        fetchUserDataForUser(searchedUser: string): any {
            var url: string = 'https://api.github.com/users/' + searchedUser;
            return this.makeGetRequest(url);
        }
        /**
         * Service method for data fetching.
         * The data is fetched from remote GitHub location.
         * If the provided string is empty, the fetchAngularData
         * method is invoked, otherwise the fetchUserDataPromiseForUser
         * is invoked.
         */
        fetchUserData(userString?: string): any {
            if (userString === undefined || userString.length === 0) {
                return this.fetchAngularData().then(this.callbackFunctionData);
            } else {
                return this.fetchUserDataForUser(userString).then(this.callbackFunctionData);
            }
        }
        /**First fetches a promise for the user data, and then from that data returns
         * the repo data throgh @fetchReposData
         */
        fetchReposForUser(user: string): any {
            return this.fetchUserData(user)
                .then((response:any) => {
                    return this.fetchReposData(response.repos_url)
                        .then(this.callbackFunctionData);
                })
        }
        /**Fetches the repositories data for a link(user). */
        fetchReposData(repoLink: string): any {
            return this.makeGetRequest(repoLink);
        }

        fetchRepoDetails(username: string, reponame: string): any{
            var service = this;
            var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
            return service.$http.get(repoUrl)
                .then(function(response: ng.IHttpPromiseCallbackArg<any>) {
                    service.repo = response.data;
                    return service.$http.get(repoUrl + repoUrl + "/collaborators");
                })
                .then(function(response: ng.IHttpPromiseCallbackArg<any>) {
                    service.repo.collaborators = response.data;
                    return service.repo;
                })


        }

        /**Small helper method for doing get() function. */
        makeGetRequest(request: string): any {
            return this.$http.get(request)
                .then(this.callbackFunctionResponse)
                .then(this.callbackFunctionData)
                ;
        }

        callbackFunctionResponse = (response: ng.IHttpPromiseCallbackArg<any>) => {
            return response.data;
        }

        callbackFunctionData = (data: any) => {
            return data;
        }
    }

    angular
        .module("app.Angular.Services")
        .service("GitHubService", GitHubService);
}