export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Zorunlu alan.',
            'invalidCreditCard': 'Geçersiz kredi kartı numarası.',
            'invalidEmailAddress': 'Geçersiz email adresi.',
            'invalidPassword': 'Geçersiz şifre. Şifre en az 6 karakter uzunluğunda olmalı ve en az bir sayı barındırmalıdır.',
            'minlength': `Minumum uzunluk ${validatorValue.requiredLength} karakter olmalıdır.`,
            'mismatchedPasswords': 'Girmiş olduğunuz şifreler uyuşmuyor.',
            'emptyCheckbox': 'En az bir tane seçilmeli.',
            'invalidInteger': 'Tam sayı girmelisiniz.'
        };

        return config[validatorName];
    }

    static integerValidator(control) {
        if (control.value % 1 === 0) {
            return null;
        } else {
            return { 'invalidInteger': true };
        }
    }

    static creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidatorChange(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value === '') {
            return null;
        }
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static checkboxGroupValidator(group) {
        let check: boolean = false;
        let i: number = 0;
        let k: number = 0;
        for (let control in group['controls']) {
            if (group['controls'].hasOwnProperty(control)) {
                if (group['controls'][control].value === '' || group['controls'][control].value === false) {
                    k++;
                }
                i++;
            }
        }

        if (i === k) {
            return { 'emptyCheckbox': true };
        } else {
            return null;
        }
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static passwordMatch(group) {
        var firstValue = group.controls.password.value;
        var secondValue = group.controls.re_password.value;
        if (firstValue === secondValue) {
            return null;
        } else {
            return { 'mismatchedPasswords': true };
        }
    }
}
