/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />

namespace app.Angular.Controllers {

    class MainCtrl implements app.Angular.ControllerContracts.IAngularController {
        title: string;
        message: string;

        constructor() {
            this.title = "Main Ctrl";
            this.message = "Main Ctrl";
        }
    }
    angular
        .module("app.Angular.Ctrls")
        .controller("MainCtrl", MainCtrl);
}