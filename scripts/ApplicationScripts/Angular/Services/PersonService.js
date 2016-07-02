var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Services;
        (function (Services) {
            var PersonService = (function () {
                function PersonService($http) {
                    this.$http = $http;
                    var service = this;
                }
                PersonService.prototype.fetchUserData = function (userString) {
                    if (userString === undefined || userString.length === 0) {
                        return this.fetchAngularData();
                    }
                    else {
                        return this.fetchUserDataPromiseForUser(userString);
                    }
                };
                PersonService.prototype.fetchAngularData = function () {
                    return this.$http.get('https://api.github.com/users/angular');
                };
                PersonService.prototype.fetchUserDataPromiseForUser = function (searchedUser) {
                    if (searchedUser === undefined || searchedUser === "") {
                        return this.fetchAngularData();
                    }
                    else {
                        var url = 'https://api.github.com/users/' + searchedUser;
                        return this.$http.get(url);
                    }
                };
                PersonService.prototype.fetchReposData = function (repoLink) {
                    return this.$http.get(repoLink);
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
