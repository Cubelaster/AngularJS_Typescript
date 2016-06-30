namespace app.Angular.Services {

    export class PersonService implements app.Angular.ServiceContracts.IPersonService {
        http: any;
        static $inject = ["$http"];
        userData: any;

        constructor($http: any) {
            var service = this;
            service.http = $http
        }

        fetchUserDataHttp(): any {
            var promise = this.http.get('https://api.github.com/users/angular');
            return promise;
        }

        fetchUserData(): any {
            this.fetchUserDataHttp().then(this.returnResult, this.returnError);
        }

        fetchUserDataPromiseForUser(searchedUser: string): any {
            var url : string = 'https://api.github.com/users/' + searchedUser;
            var promise = this.http.get(url);
            return promise;
        }

        returnResult(data):any {
            return data;
        }

        returnError(data):any {
            return "Error occured!";
        }

    }
    angular
        .module("app.Angular.Services")
        .service("PersonService", PersonService);
}