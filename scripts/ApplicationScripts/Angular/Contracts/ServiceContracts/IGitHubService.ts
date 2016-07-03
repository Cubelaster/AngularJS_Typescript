namespace app.Angular.ServiceContracts {
    export interface IGitHubService{
        fetchUserData(userString?: string): void;
    }
}