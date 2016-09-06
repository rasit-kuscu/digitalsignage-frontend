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

@Component({
    selector: "designer-main",
    templateUrl: "./app/designer/components/designer.list.html",
    styleUrls: ['./app/designer/components/designer.css'],
    directives: [
        NgClass,
        NgStyle,
        ROUTER_DIRECTIVES,
        MODAL_DIRECTIVES,
        SimpleNotificationsComponent,
        NodeListComponent],
    providers: [NodeService, NotificationsService]
})
export class DesignerListComponent implements OnInit {
    type: string = "DESIGNER";
    notificationOptions = { timeOut: 5000, maxStack: 1 };
    isDataAvailable: boolean = false;
    nodes: NodeConst[];
    nodeTree: NodeConst[];
    breadcrumb: any[];
    items: any[];
    currentNode: any;
    isModalProccessing: boolean = false;
    modalDisableClose: any = 'static';
    modalDisableCloseKeyboard: boolean = false;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private _sharedService: SharedService,
        private _nodeService: NodeService,
        private formBuilder: FormBuilder,
        private _notificationService: NotificationsService) {
    }

    nodeAction($event) {
        if ($event.event === 'nodeDeleted' || $event.event === 'nodeMoved') {
            this.router.navigate(['/designer', { id: $event.node['parentNode']['id'] }]);
        } else if ($event.event === 'itemMoved') {
            this.router.navigate(['/designer', { id: $event.item['parentNode']['id'] }]);
        } else if ($event.event === 'itemCreated') {
            this.router.navigate(['/designer', 'edit', { id: $event.item['id'] }]);
        }
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        let id = 0;
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
        this.isDataAvailable = false;
        this._nodeService.load(id, 'designer')
            .subscribe(
            (response) => {
                if (response.status === 'success') {
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
