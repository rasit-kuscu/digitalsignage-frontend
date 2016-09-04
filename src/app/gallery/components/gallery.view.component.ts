import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { NodeService } from '../../node/services/node.service';

@Component({
    selector: "gallery-main",
    templateUrl: "./app/gallery/components/gallery.view.html",
    styleUrls: ['./app/gallery/components/gallery.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [NodeService]
})
export class GalleryViewComponent implements OnInit {
    constructor(private _location: Location,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _nodeService: NodeService) {
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
                console.log(response);
                if (response.status === 'success') {

                } else if (response.status === 'fail') {

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
}
