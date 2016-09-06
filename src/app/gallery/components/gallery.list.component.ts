import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle } from '@angular/common';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, NavigationEnd } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { SharedService } from '../../common/services/shared.service';
import { NodeService } from '../../node/services/node.service';
import { NodeListComponent } from '../../node/components/node.list.component';
import { Node } from '../../node/models/node';
import { NodeConst } from '../../node/models/node.const';
import { FileUploader, FILE_UPLOAD_DIRECTIVES }   from 'ng2-file-upload/ng2-file-upload';

@Component({
    selector: "gallery-main",
    templateUrl: "./app/gallery/components/gallery.list.html",
    styleUrls: ['./app/gallery/components/gallery.css'],
    directives: [
        FILE_UPLOAD_DIRECTIVES,
        NgClass,
        NgStyle,
        ROUTER_DIRECTIVES,
        MODAL_DIRECTIVES,
        SimpleNotificationsComponent,
        NodeListComponent],
    providers: [NodeService, NotificationsService]
})
export class GalleryListComponent implements OnInit {
    type: string = "GALLERY";
    mainUrl: string = "";
    thumbnailUrl: string = "";
    notificationOptions = { timeOut: 5000, maxStack: 1 };
    isDataAvailable: boolean = false;
    isTableAvailable: boolean = false;
    isUploadingAll: boolean = false;
    nodes: NodeConst[];
    nodeTree: NodeConst[];
    breadcrumb: any[];
    items: any[];
    currentNode: any;
    isModalProccessing: boolean = false;
    modalDisableClose: any = 'static';
    modalDisableCloseKeyboard: boolean = false;

    public hasBaseDropZoneOver: boolean = false;
    public uploader: FileUploader;
    @ViewChild('uploadEl') uploadElRef: ElementRef;

    @ViewChild('uploadModal')
    uploadModal: ModalComponent;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private _sharedService: SharedService,
        private _nodeService: NodeService,
        private formBuilder: FormBuilder,
        private _notificationService: NotificationsService) {
        this.uploader = new FileUploader({
            url: _sharedService.apiUrl + 'gallery_item/upload',
            authToken: 'Bearer ' + localStorage.getItem('id_token'),
            allowedMimeType: ['image/png', 'video/mp4', 'image/jpeg'],
            removeAfterUpload: true,
            disableMultipart: true
        });
        this.uploader.onProgressAll = () => {
            this.isUploadingAll = true;
            this._notificationService.alert('Yükleniyor', 'Dosya(lar) yükleniyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        };
        this.uploader.onCompleteAll = () => {
            this.isUploadingAll = false;
        };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (response !== "") {
                let responsePath = JSON.parse(response);
                if (responsePath instanceof Array) {
                    if (responsePath[0]['status'] === "success") {
                        this.items.push(responsePath[0]['data']);
                        this._notificationService.success('İşlem Başarılı', 'Dosya başarıyla yüklendi !', {});
                    } else if (responsePath[0]['status'] === "fail") {
                        if (responsePath[0]['message'] === "file_storage_cant_connect") {
                            this._notificationService.error('Hata', 'Dosya servisine bağlanılamıyor !', {});
                        } else if (responsePath[0]['message'] === "file_storage_cant_upload") {
                            this._notificationService.error('Hata', 'Dosya yüklenemedi !', {});
                        } else {
                            this._notificationService.error('Hata', 'Bir şeyler yanlış gitti !', {});
                        }
                    } else {
                        this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                    }
                } else {
                    this.router.navigate(['/error', { status: responsePath.status, message: encodeURIComponent(response) }]);
                }
            }
        };
    }

    nodeAction($event) {
        if ($event.event === 'nodeDeleted' || $event.event === 'nodeMoved') {
            this.router.navigate(['/item', 'gallery', { id: $event.node['parentNode']['id'] }]);
        } else if ($event.event === 'itemModal') {
            this.uploadModal.open('lg');
        } else if ($event.event === 'itemMoved') {
            this.router.navigate(['/item', 'gallery', { id: $event.item['parentNode']['id'] }]);
        }
    }

    ngAfterViewInit() {
        this.uploader.onAfterAddingFile = (item => {
            this.uploadElRef.nativeElement.value = '';
        });
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    ngOnInit() {
        this.uploader['isHTML5'] = true;

        let id = 0;
        this.activatedRoute.params
            .map(params => params['id'])
            .subscribe((id) => {
                if (typeof id === 'undefined') {
                    id = 0;
                }

                this.load(id);

                this.uploader.onBuildItemForm = (item, form) => {
                    form.append('nodeId', this.currentNode['id']);
                };
            });
    }

    load(id: number) {
        this.isTableAvailable = false;
        this._nodeService.load(id, 'gallery')
            .subscribe(
            (response) => {
                if (response.status === 'success') {
                    this.mainUrl = response.data.mainUrl;
                    this.thumbnailUrl = response.data.thumbnailUrl;
                    this.breadcrumb = response.data.breadcrumb;
                    this.currentNode = response.data.node;
                    this.nodes = response.data.nodes;
                    this.items = this.currentNode['item'];
                    this.isDataAvailable = true;
                } else if (response.status === 'fail') {
                    if (response.message === 'no_access') {
                        var jsonData = {};
                        jsonData["error"] = "Forbidden";
                        jsonData["exception"] = "org.springframework.security.access.AccessDeniedException";
                        this.router.navigate(['/error', { status: 401, message: encodeURIComponent(JSON.stringify(jsonData)) }]);
                    }
                } else {
                    this.router.navigate(['/error', { status: response.status, message: encodeURIComponent(response.message) }]);
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    onClose() {
    }
}
