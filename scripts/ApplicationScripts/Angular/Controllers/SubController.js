/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />
var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Controllers;
        (function (Controllers) {
            var SubController = (function () {
                function SubController() {
                    this.title = "Sub Controller";
                    this.message = "Sub Controller";
                }
                return SubController;
            }());
            angular
                .module("app.Angular.Controllers")
                .controller("SubController", SubController);
        })(Controllers = Angular.Controllers || (Angular.Controllers = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
