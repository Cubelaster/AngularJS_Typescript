namespace app {
    var services = angular.module("app.Angular.Services", []);
    var main = angular.module("app.Angular.Ctrls", [
        "app.Angular.Services"
    ]);
    var sub = angular.module("app.Angular.Controllers", [
        "app.Angular.Services"
    ]);
}