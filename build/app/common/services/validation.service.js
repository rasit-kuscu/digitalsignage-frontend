System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ValidationService;
    return {
        setters:[],
        execute: function() {
            ValidationService = (function () {
                function ValidationService() {
                }
                ValidationService.getValidatorErrorMessage = function (validatorName, validatorValue) {
                    var config = {
                        'required': 'Zorunlu alan.',
                        'invalidCreditCard': 'Geçersiz kredi kartı numarası.',
                        'invalidEmailAddress': 'Geçersiz email adresi.',
                        'invalidPassword': 'Geçersiz şifre. Şifre en az 6 karakter uzunluğunda olmalı ve en az bir sayı barındırmalıdır.',
                        'minlength': "Minumum uzunluk " + validatorValue.requiredLength + " karakter olmal\u0131d\u0131r.",
                        'mismatchedPasswords': 'Girmiş olduğunuz şifreler uyuşmuyor.',
                        'emptyCheckbox': 'En az bir tane seçilmeli.'
                    };
                    return config[validatorName];
                };
                ValidationService.creditCardValidator = function (control) {
                    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
                    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
                        return null;
                    }
                    else {
                        return { 'invalidCreditCard': true };
                    }
                };
                ValidationService.emailValidator = function (control) {
                    // RFC 2822 compliant regex
                    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                        return null;
                    }
                    else {
                        return { 'invalidEmailAddress': true };
                    }
                };
                ValidationService.passwordValidatorChange = function (control) {
                    // {6,100}           - Assert password is between 6 and 100 characters
                    // (?=.*[0-9])       - Assert a string has at least one number
                    if (control.value === '') {
                        return null;
                    }
                    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                        return null;
                    }
                    else {
                        return { 'invalidPassword': true };
                    }
                };
                ValidationService.checkboxGroupValidator = function (group) {
                    var check = false;
                    var i = 0;
                    var k = 0;
                    for (var control in group['controls']) {
                        if (group['controls'].hasOwnProperty(control)) {
                            if (group['controls'][control].value === '' || group['controls'][control].value === false) {
                                k++;
                            }
                            i++;
                        }
                    }
                    if (i === k) {
                        return { 'emptyCheckbox': true };
                    }
                    else {
                        return null;
                    }
                };
                ValidationService.passwordValidator = function (control) {
                    // {6,100}           - Assert password is between 6 and 100 characters
                    // (?=.*[0-9])       - Assert a string has at least one number
                    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                        return null;
                    }
                    else {
                        return { 'invalidPassword': true };
                    }
                };
                ValidationService.passwordMatch = function (group) {
                    var firstValue = group.controls.password.value;
                    var secondValue = group.controls.re_password.value;
                    if (firstValue === secondValue) {
                        return null;
                    }
                    else {
                        return { 'mismatchedPasswords': true };
                    }
                };
                return ValidationService;
            }());
            exports_1("ValidationService", ValidationService);
        }
    }
});

//# sourceMappingURL=validation.service.js.map
