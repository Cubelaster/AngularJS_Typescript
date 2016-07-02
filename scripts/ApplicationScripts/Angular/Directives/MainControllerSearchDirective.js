var app;
(function (app) {
    var Angular;
    (function (Angular) {
        var Directives;
        (function (Directives) {
            var MainControllerSearchDirective = (function () {
                function MainControllerSearchDirective() {
                    this.controller = 'MainController';
                    this.controllerAs = 'main';
                    this.scope = {};
                }
                return MainControllerSearchDirective;
            }());
            Directives.MainControllerSearchDirective = MainControllerSearchDirective;
            angular
                .module('app.Angular.Directives')
                .directive('mainCtrlDirective', [function () { return new app.Angular.Directives.MainControllerSearchDirective(); }]);
        })(Directives = Angular.Directives || (Angular.Directives = {}));
    })(Angular = app.Angular || (app.Angular = {}));
})(app || (app = {}));
