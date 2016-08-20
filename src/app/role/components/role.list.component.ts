import { Component, AfterViewInit, OnInit, ViewChild } from "@angular/core";
import { CORE_DIRECTIVES } from '@angular/common';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/components/pagination';
import { DialogRef } from 'angular2-modal';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';
import { SharedService } from '../../common/services/shared.service';

@Component({
	selector: "role-main",
	templateUrl: "./app/role/components/role.list.html",
	directives: [ROUTER_DIRECTIVES, PAGINATION_DIRECTIVES, CORE_DIRECTIVES, MODAL_DIRECTIVES, SimpleNotificationsComponent],
	providers: [RoleService, NotificationsService]
})
export class RoleListComponent implements OnInit {
	notificationOptions = {timeOut: 5000, maxStack: 1};
	page: number;
	roles:Role[];
	deletingRole:Role;
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
	@ViewChild('roleDeleteModal')
	roleDeleteModal: ModalComponent;
	modalDisableClose:any = 'static';

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private _roleService: RoleService,
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
		this._roleService.list(page)
		.subscribe(
			response => {
				if (response.status === 'success') {
					this.itemsPerPage = this._roleService.itemsPerPage;
					this.totalItems = response.data.totalPage * this.itemsPerPage;
					this.currentPage = response.data.currentPage;
					this.roles = response.data.content;
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

	openRoleDeleteModal(role:Role) {
		this.deletingRole = role;
		this.roleDeleteModal.open();
	}

	delete() {
		this.isDeleting = true;
		this._roleService.delete(this.deletingRole.id)
		.subscribe(
			(response) => {
				this.isDeleting = false;
				if (response.status === 'success') {
					this.roleDeleteModal.close();
					this.list(this.page);
					this._notificationService.success('İşlem Başarılı', 'Yetki başarıyla silindi.', {});
				} else {
					this.router.navigate(['/error', {status: response.status, message: encodeURIComponent(response.message)}]);
				}
			},
			error => {
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error.statusText)}]);
			}
		);
	}

	onClose() {
		this.deletingRole = null;
	}
}
