var app;
(function (app) {
    var core;
    (function (core) {
        var Models;
        (function (Models) {
            var Person = (function () {
                function Person(firstName, lastName, imageSrc) {
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.imageSrc = imageSrc === undefined ? "" : imageSrc;
                }
                return Person;
            }());
            Models.Person = Person;
        })(Models = core.Models || (core.Models = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
