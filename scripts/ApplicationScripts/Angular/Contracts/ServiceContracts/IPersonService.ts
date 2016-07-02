namespace app.Angular.ServiceContracts {
    export interface IPersonService {
        fetchUserData(userString?: string): void;
    }
}