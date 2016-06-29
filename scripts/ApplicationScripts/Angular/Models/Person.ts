namespace app.core.Models {
    export class Person implements app.core.ModelContracts.IPerson {
        firstName: string;
        lastName: string;
        imageSrc: string;

        constructor(firstName: string, lastName: string, imageSrc?: string) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.imageSrc = imageSrc === undefined ? "" : imageSrc;
        }
    }
}