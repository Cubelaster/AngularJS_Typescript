namespace app.Angular.ServiceContracts {
    export interface IPersonService {
        fetchUserData(successCallback: Function): void;
    }
}