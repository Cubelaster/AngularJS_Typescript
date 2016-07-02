namespace app.Angular.Services {

    export class PersonService implements app.Angular.ServiceContracts.IPersonService {
        userData: any;

        static $inject = ["$http"];
        constructor(private $http: any) {
            var service = this;
        }

        fetchUserData(userString?: string): any {
            if (userString === undefined || userString.length === 0) {
                return this.fetchAngularData();
            } else {
                return this.fetchUserDataPromiseForUser(userString);
            }
        }

        fetchAngularData(): any {
            return this.$http.get('https://api.github.com/users/angular');
        }

        fetchUserDataPromiseForUser(searchedUser: string): any {
            var url: string = 'https://api.github.com/users/' + searchedUser;
            return this.$http.get(url);
        }

        fetchReposData(repoLink: string): any {
            return this.$http.get(repoLink);
        }

    }
    angular
        .module("app.Angular.Services")
        .service("PersonService", PersonService);
}