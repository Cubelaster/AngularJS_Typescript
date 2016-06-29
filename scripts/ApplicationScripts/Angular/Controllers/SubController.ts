/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />

namespace app.Angular.Controllers {

    class SubController implements app.Angular.ControllerContracts.IAngularController {
        title: string;
        message: string;

        constructor() {
            this.title = "Sub Controller";
            this.message = "Sub Controller";
        }
    }
    angular
        .module("app.Angular.Controllers")
        .controller("SubController", SubController);
}