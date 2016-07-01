namespace app.Angular.Directives {

    export class MainControllerSearchDirective implements ng.IDirective {
        public controller: string = 'MainController';
        public controllerAs: string = 'main';
        public scope = {};
    }

    angular
        .module('app.Angular.Directives')
        .directive('mainCtrlDirective', 
            [() => new app.Angular.Directives.MainControllerSearchDirective()]
            );
}