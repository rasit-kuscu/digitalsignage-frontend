import { Component, OnInit } from "@angular/core";
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { ValidationService } from '../../common/services/validation.service';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { ControlMessages } from '../../common/components/control.messages';
import { Group } from '../../group/models/group';
import { GroupService } from '../../group/services/group.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: "group-new",
    templateUrl: "./app/group/components/group.new.html",
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, SimpleNotificationsComponent, ControlMessages, LoaderAnimation],
    providers: [GroupService, NotificationsService]
})
export class GroupNewComponent implements OnInit {
    notificationOptions = { timeOut: 5000, maxStack: 1 };
    isSaving: boolean = false;
    newGroupForm: any;
    group: Group;

    constructor(
        private _groupService: GroupService,
        private formBuilder: FormBuilder,
        private _notificationService: NotificationsService,
        public router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.newGroupForm = this.formBuilder.group({
            'name': ['', Validators.required]
        });
    }

    save() {
        this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this.isSaving = true;
        this._groupService.save(new Group(0, this.newGroupForm.value.name))
            .subscribe(
            (response) => {
                this.isSaving = false;
                if (response.status === 'success') {
                    this._notificationService.success('İşlem Başarılı', 'Grup oluşturuldu.', {});
                    this.router.navigate(['/management', 'group']);
                } else if (response.status === 'fail') {
                    if (response.message === 'group_name_taken') {
                        this._notificationService.error('Hata', 'Girilen grup adı kayıtlı.', {});
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
