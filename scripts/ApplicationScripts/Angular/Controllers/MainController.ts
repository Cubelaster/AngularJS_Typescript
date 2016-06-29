/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />
/// <reference path="../Models/Person.ts" />
declare var $: JQueryStatic;

namespace app.Angular.Controllers {

    class MainController implements app.Angular.ControllerContracts.IAngularController {
        title: string;
        message: string;
        person: app.core.Models.Person;
        gitPerson;

        static $inject = ["PersonService"];
        constructor(private personService: app.Angular.Services.PersonService) {
            var controller = this;

            controller.title = "Main Controller";
            controller.person = new app.core.Models.Person("Scott", "Allen", "http://odetocode.com/Images/scott_allen_2.jpg");

            controller.fetchUserDataPromise(function (data) {
                if ($.type(data) === "string") {
                    controller.message = data;
                }else{
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

        fetchUserDataPromise(successCallback: Function): void {
            this.personService.fetchUserDataHttp().success(function(data, status) {
                successCallback(data);
            })
        }
    }

    angular
        .module("app.Angular.Controllers")
        .controller("MainController", MainController);
}