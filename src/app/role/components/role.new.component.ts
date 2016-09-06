import { Component, OnInit } from "@angular/core";
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { ValidationService } from '../../common/services/validation.service';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { ControlMessages } from '../../common/components/control.messages';
import { Role } from '../../role/models/role';
import { Privilege } from '../../role/models/privilege';
import { RoleService } from '../../role/services/role.service';
import { PrivilegeService } from '../../role/services/privilege.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: "role-new",
    templateUrl: "./app/role/components/role.new.html",
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, SimpleNotificationsComponent, ControlMessages, LoaderAnimation],
    providers: [RoleService, PrivilegeService, NotificationsService]
})
export class RoleNewComponent implements OnInit {
    notificationOptions = { timeOut: 5000, maxStack: 1 };
    isSaving: boolean = false;
    isDataAvailable: boolean = false;
    newRoleForm: any;
    role: Role;
    privilegeList: any[];
    formPrivilegeArr: FormControl[] = [];

    constructor(
        private _roleService: RoleService,
        private _privilegeService: PrivilegeService,
        private formBuilder: FormBuilder,
        private _notificationService: NotificationsService,
        public router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        Observable.forkJoin(
            this._privilegeService.load()
        ).subscribe(
            response => {
                if (response[0].status === 'success') {
                    this.privilegeList = response[0].data;
                    this.populateCheckBoxes();

                    this.prepareForm();
                    this.isDataAvailable = true;
                } else {
                    this.router.navigate(['/error', { status: response[0].status, message: encodeURIComponent(response[0].message) }]);
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    prepareForm() {
        this.newRoleForm = this.formBuilder.group({
            'name': ['', Validators.required],
            'privileges': this.formBuilder.group(this.formPrivilegeArr, { validator: ValidationService.checkboxGroupValidator })
        });
    }

    populateCheckBoxes() {
        for (let privilege of this.privilegeList) {
            this.formPrivilegeArr[privilege.id] = new FormControl(false);
        }
    }

    updateCheckedOptions(option, event) {
        if (option.isChecked) {
            option.isChecked = false;
        } else {
            option.isChecked = true;
        }
    }

    save() {
        let privileges: number[] = [];

        for (let privilege of this.privilegeList) {
            if (privilege.isChecked) {
                privileges.push(privilege.id);
            }
        }

        this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this.isSaving = true;
        this._roleService.save(new Role(0, this.newRoleForm.value.name, privileges))
            .subscribe(
            (response) => {
                this.isSaving = false;
                if (response.status === 'success') {
                    this._notificationService.success('İşlem Başarılı', 'Yetki oluşturuldu.', {});
                    this.router.navigate(['/management', 'role']);
                } else if (response.status === 'fail') {
                    if (response.message === 'role_name_taken') {
                        this._notificationService.error('Hata', 'Girilen yetki adı kayıtlı.', {});
                    }
                } else {
                    this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }
}
