import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
    selector: 'control-messages',
    template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessages {
    @Input() control: FormControl;
    constructor() { }

    get errorMessage(): string {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName)) {
                var touched = this.control.touched;
                if (this.control instanceof FormGroup) {
                    for (let groupControl in this.control['controls']) {
                        if (this.control['controls'][groupControl].touched) {
                            touched = true;
                        }
                    }
                }
                if (touched) {
                    return ValidationService.getValidatorErrorMessage(propertyName,
                        this.control.errors[propertyName]);
                }
            }
        }

        return null;
    }
}
