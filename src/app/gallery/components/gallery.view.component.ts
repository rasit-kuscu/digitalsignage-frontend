import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { NodeService } from '../../node/services/node.service';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

@Component({
    selector: "gallery-main",
    templateUrl: "./app/gallery/components/gallery.view.html",
    styleUrls: ['./app/gallery/components/gallery.css'],
    directives: [ROUTER_DIRECTIVES, SimpleNotificationsComponent],
    providers: [NodeService, NotificationsService]
})
export class GalleryViewComponent implements OnInit {
    isLoaded: boolean = false;
    item: any;
    constructor(private _location: Location,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _nodeService: NodeService,
        private _notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.activatedRoute.params
            .map(params => params['id'])
            .subscribe((id) => {
                if (typeof id === 'undefined') {
                    id = 0;
                }

                this.load(id);
            });
    }

    load(id: number) {
        this._nodeService.itemView(id)
            .subscribe(
            (response) => {
                if (response.status === 'success') {
                    this.item = response.data;
                    this.item['galleryItem']['duration'] = new Date(response.data['galleryItem']['duration'] * 1000).toISOString().substr(11, 8);
                    this.isLoaded = true;
                } else if (response.status === 'fail') {
                    this._notificationService.error('Hata', 'Bir şeyler yanlış gitti !', {});
                    this._location.back();
                } else {
                    this._notificationService.error('Hata', 'Bir şeyler yanlış gitti !', {});
                    this._location.back();
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    backClicked() {
        this._location.back();
    }

    humanFileSize(bytes, si) {
        let thresh = si ? 1000 : 1024;
        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }

        let units = si
            ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        let u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);

        return bytes.toFixed(1) + ' ' + units[u];
    }
}
