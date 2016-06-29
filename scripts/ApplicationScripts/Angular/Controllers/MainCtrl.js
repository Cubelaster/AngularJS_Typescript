/// <reference path="../Contracts/ControllerContracts/IAngularController.ts" />
var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Controllers;
        (function (Controllers) {
            var MainCtrl = (function () {
                function MainCtrl() {
                    this.title = "Main Ctrl";
                    this.message = "Main Ctrl";
                }
                return MainCtrl;
            }());
            angular
                .module("app.Angular.Ctrls")
                .controller("MainCtrl", MainCtrl);
        })(Controllers = Angular.Controllers || (Angular.Controllers = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
