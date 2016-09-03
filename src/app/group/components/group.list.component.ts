import { Component, AfterViewInit, OnInit, ViewChild } from "@angular/core";
import { CORE_DIRECTIVES } from '@angular/common';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/components/pagination';
import { DialogRef } from 'angular2-modal';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { GroupService } from '../services/group.service';
import { Group } from '../models/group';
import { SharedService } from '../../common/services/shared.service';

@Component({
	selector: "group-main",
	templateUrl: "./app/group/components/group.list.html",
	directives: [ROUTER_DIRECTIVES, PAGINATION_DIRECTIVES, CORE_DIRECTIVES, MODAL_DIRECTIVES, SimpleNotificationsComponent],
	providers: [GroupService, NotificationsService]
})
export class GroupListComponent implements OnInit {
	notificationOptions = {timeOut: 5000, maxStack: 1};
	page: number;
	groups:Group[];
	deletingGroup:Group;
	isDeleting:boolean = false;
	/* pagination items */
	totalItems:number;
	currentPage:number;
	maxSize:number = 5;
	itemsPerPage:number;
	previousText:string = "Önceki";
	nextText:string = "Sonraki";
	firstText:string = "İlk";
	lastText:string = "Son";
	isPaginationDisabled:boolean = true;
	isTableAvailable:boolean = false;
	/*
	* workaround for calling pageChanged event twice
	* lame but works
	*/
	dataLoadCount:number = 0;
	@ViewChild('groupDeleteModal')
	groupDeleteModal: ModalComponent;
	modalDisableClose:any = 'static';

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private _groupService: GroupService,
		private _notificationService: NotificationsService,
		private _sharedService: SharedService
		) {
	}

	ngOnInit() {
		this.page = this.activatedRoute.snapshot.params['page'];
		if (typeof this.page === 'undefined') {
			this.page = 1;
			this.dataLoadCount = 2;
		}
		this.list(this.page);
	}

	list(page: number) {
		this.isPaginationDisabled = true;
		this.isTableAvailable = false;
		this._groupService.list(page)
		.subscribe(
			response => {
				if (response.status === 'success') {
					this.itemsPerPage = this._groupService.itemsPerPage;
					this.totalItems = response.data.totalPage * this.itemsPerPage;
					this.currentPage = response.data.currentPage;
					this.groups = response.data.content;
					this.dataLoadCount++;
					this.isTableAvailable = true;
					this.isPaginationDisabled = false;
				}
			},
			error => {
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error._body)}]);
			}
		);
	}

	pageChanged(event:any) {
		if (this.dataLoadCount > 1) {
			this.list(event.page);
		}
		this.dataLoadCount++;
	}

	openGroupDeleteModal(group:Group) {
		this.deletingGroup = group;
		this.groupDeleteModal.open();
	}

	delete() {
		this.isDeleting = true;
		this._groupService.delete(this.deletingGroup.id)
		.subscribe(
			(response) => {
				this.isDeleting = false;
				this.groupDeleteModal.close();
				if (response.status === 'success') {
					this.list(this.page);
					this._notificationService.success('İşlem Başarılı', 'Grup başarıyla silindi.', {});
				} else if (response.status === 'fail') {
					if (response.message === 'group_does_not_exist') {
						this._notificationService.error('Hata', 'Seçilen grup bulunamadı.', {});
					} else if (response.message === 'group_atleast_one') {
						this._notificationService.error('Hata', 'En azından bir gruba sahip olmanız gerekiyor.', {});
					}
				} else {
					this.router.navigate(['/error', {status: response.status, message: encodeURIComponent(response.message)}]);
				}
			},
			error => {
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error._body)}]);
			}
		);
	}

	onClose() {
		this.deletingGroup = null;
	}
}
