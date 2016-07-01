var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Services;
        (function (Services) {
            var PersonService = (function () {
                function PersonService($http) {
                    var service = this;
                    service.http = $http;
                }
                PersonService.prototype.fetchUserDataHttp = function () {
                    var promise = this.http.get('https://api.github.com/users/angular');
                    return promise;
                };
                PersonService.prototype.fetchUserData = function () {
                    this.fetchUserDataHttp().then(this.returnResult, this.returnError);
                };
                PersonService.prototype.fetchUserDataPromiseForUser = function (searchedUser) {
                    var url = 'https://api.github.com/users/' + searchedUser;
                    var promise = this.http.get(url);
                    return promise;
                };
                PersonService.prototype.fetchReposData = function (repoLink) {
                    return this.http.get(repoLink);
                };
                PersonService.prototype.returnResult = function (data) {
                    return data;
                };
                PersonService.prototype.returnError = function (data) {
                    return "Error occured!";
                };
                PersonService.$inject = ["$http"];
                return PersonService;
            }());
            Services.PersonService = PersonService;
            angular
                .module("app.Angular.Services")
                .service("PersonService", PersonService);
        })(Services = Angular.Services || (Angular.Services = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
