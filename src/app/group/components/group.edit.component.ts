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
	selector: "group-edit",
	templateUrl: "./app/group/components/group.edit.html",
	directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, SimpleNotificationsComponent, ControlMessages, LoaderAnimation],
	providers: [GroupService, NotificationsService]
})
export class GroupEditComponent implements OnInit {
	isDataAvailable: boolean = false;
	notificationOptions = {timeOut: 5000, maxStack: 1};
	isSaving:boolean = false;
  editGroupForm:any;
	group: Group;
	groupId: number;

  constructor(
		private _groupService: GroupService,
		private formBuilder: FormBuilder,
		private _notificationService: NotificationsService,
		public router:Router,
		private activatedRoute: ActivatedRoute) {
  }

	ngOnInit() {
		this.groupId = this.activatedRoute.snapshot.params['id'];
		Observable.forkJoin(
			this._groupService.detail(this.groupId)
		).subscribe(
      response => {
				if (response[0].status === 'success') {
					this.group = response[0].data;

					this.editGroupForm = this.formBuilder.group({
						'name': [this.group['name'], Validators.required]
					});

					this.isDataAvailable = true;
				} else {
					this.router.navigate(['/error', {status: response[0].status, message: encodeURIComponent(response[0].message)}]);
				}
			},
			error => {
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error._body)}]);
			}
		);
	}

	save() {
		this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', {timeOut:0, clickToClose:false});
		this.isSaving = true;
		this._groupService.update(new Group(this.groupId, this.editGroupForm.value.name))
		.subscribe(
			(response) => {
				this.isSaving = false;
				if (response.status === 'success') {
					this._notificationService.success('İşlem Başarılı', 'Grup bilgileri güncellendi.', {});
				} else if (response.status === 'fail') {
					if (response.message === 'group_name_taken') {
						this._notificationService.error('Hata', 'Girilen grup adı kayıtlı.', {});
					}
				}
			},
			error => {
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error._body)}]);
			}
		);
	}
}
