import { Component, AfterViewInit, OnInit, ViewChild } from "@angular/core";
import { CORE_DIRECTIVES } from '@angular/common';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/components/pagination';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { SharedService } from '../../common/services/shared.service';

@Component({
    selector: "user-list",
    templateUrl: "./app/user/components/user.list.html",
    styleUrls: ['./app/user/components/user.css'],
    directives: [ROUTER_DIRECTIVES, PAGINATION_DIRECTIVES, CORE_DIRECTIVES, MODAL_DIRECTIVES, SimpleNotificationsComponent],
    providers: [UserService, NotificationsService]
})
export class UserListComponent implements OnInit {
    notificationOptions = { timeOut: 5000, maxStack: 1 };
    users: User[];
    deletingUser: User;
    isDeleting: boolean = false;
    /* pagination items */
    totalItems: number;
    currentPage: number;
    maxSize: number = 5;
    itemsPerPage: number;
    pageSub: any;
    page: number;
    previousText: string = "Önceki";
    nextText: string = "Sonraki";
    firstText: string = "İlk";
    lastText: string = "Son";
    isPaginationDisabled: boolean = true;
    isTableAvailable: boolean = false;
	/*
	* workaround for calling pageChanged event twice
	* lame but works
	*/
    dataLoadCount: number = 0;
    @ViewChild('userDeleteModal')
    userDeleteModal: ModalComponent;
    modalDisableClose: any = 'static';

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _userService: UserService,
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
        this._userService.list(page)
            .subscribe(
            response => {
                if (response.status === 'success') {
                    this.itemsPerPage = this._userService.itemsPerPage;
                    this.totalItems = response.data.totalPage * this.itemsPerPage;
                    this.currentPage = response.data.currentPage;
                    this.users = response.data.content;
                    this.dataLoadCount++;
                    this.isTableAvailable = true;
                    this.isPaginationDisabled = false;
                } else {
                    this.router.navigate(['/error', { status: response.status, message: encodeURIComponent(response.message) }]);
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    pageChanged(event: any) {
        if (this.dataLoadCount > 1) {
            this.list(event.page);
        }
        this.dataLoadCount++;
    }

    openUserDeleteModal(user: User) {
        this.deletingUser = user;
        this.userDeleteModal.open();
    }

    delete() {
        this.isDeleting = true;
        this._userService.delete(this.deletingUser.id)
            .subscribe(
            (response) => {
                this.isDeleting = false;
                if (response.status === 'success') {
                    this.userDeleteModal.close();
                    this.list(this.page);
                    this._notificationService.success('İşlem Başarılı', 'Kullanıcı başarıyla silindi.', {});
                } else {
                    this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    onClose() {
        this.deletingUser = null;
    }
}
