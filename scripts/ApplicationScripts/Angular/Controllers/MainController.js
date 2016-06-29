/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />
/// <reference path="../Models/Person.ts" />
var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Controllers;
        (function (Controllers) {
            var MainController = (function () {
                function MainController(personService) {
                    this.personService = personService;
                    var controller = this;
                    controller.title = "Main Controller";
                    controller.person = new app.core.Models.Person("Scott", "Allen", "http://odetocode.com/Images/scott_allen_2.jpg");
                    controller.fetchUserDataPromise(function (data) {
                        if ($.type(data) === "string") {
                            controller.message = data;
                        }
                        else {
                            controller.gitPerson = data;
                        }
                    });
                    // controller.fetchUserData(function (data) {
                    //     controller.gitPerson = data;
                    // })
                }
                // fetchUserData(successCallback: Function): void {
                //     this.httpService.get('https://api.github.com/users/robconery').success(function (data, status) {
                //         successCallback(data);
                //     });
                // }
                MainController.prototype.fetchUserDataPromise = function (successCallback) {
                    this.personService.fetchUserDataHttp().success(function (data, status) {
                        successCallback(data);
                    });
                };
                MainController.$inject = ["PersonService"];
                return MainController;
            }());
            angular
                .module("app.Angular.Controllers")
                .controller("MainController", MainController);
        })(Controllers = Angular.Controllers || (Angular.Controllers = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
