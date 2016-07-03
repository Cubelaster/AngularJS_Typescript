namespace app.Angular.Services {

    export class GitHubService
        implements app.Angular.ServiceContracts.IGitHubService {

        static $inject = ["$http"];
        constructor(private $http: ng.IHttpService) {
            var service = this;
        }
        /**Fetches the Angular data from the https://api.github.com/users/angular link. */
        fetchAngularData(): any {
            return this.makeGetRequest('https://api.github.com/users/angular')
                .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                })
        }

        fetchUserDataForUser(searchedUser: string): any {
            var url: string = 'https://api.github.com/users/' + searchedUser;
            return this.makeGetRequest(url)
                .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                })
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
                return this.fetchAngularData();
            } else {
                return this.fetchUserDataForUser(userString);
            }
        }
        /**First fetches a promise for the user data, and then from that data returns
         * the repo data throgh @fetchReposData
         */
        fetchReposForUser(user: string): any {
            return this.fetchUserData(user)
                .then((response:any) => {
                    return this.fetchReposData(response.repos_url)
                        .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                            return response;
                        })
                })
        }
        /**Fetches the repositories data for a link(user). */
        fetchReposData(repoLink: string): any {
            return this.makeGetRequest(repoLink)
                .then((response: ng.IHttpPromiseCallbackArg<any>) => {
                    return response.data;
                })
        }
        /**Small helper method for doing get() function. */
        makeGetRequest(request: string): any {
            return this.$http.get(request);
        }
    }

    angular
        .module("app.Angular.Services")
        .service("GitHubService", GitHubService);
}