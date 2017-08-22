"use strict";
var FormData = (function () {
    function FormData() {
        this.stateList = '';
        this.work = '';
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
    FormData.prototype.clear = function () {
        this.stateList = '';
        this.work = '';
        this.sal;
        this.loanamt;
    };
    return FormData;
}());
exports.FormData = FormData;
var Personal = (function () {
    function Personal() {
        this.stateList = '';
        this.work = '';
    }
    return Personal;
}());
exports.Personal = Personal;
var Address = (function () {
    function Address() {
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
    return Address;
}());
exports.Address = Address;
//# sourceMappingURL=formData.model.js.map