namespace app.Angular.Scope {
        export interface IMainControllerSearchscope extends ng.IScope {
        mainCtrl: app.Angular.Controllers.MainController;
        personService: app.Angular.Services.PersonService;
        searchResult: any;
    }
}