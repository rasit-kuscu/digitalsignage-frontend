import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TimeAgoPipe } from 'angular2-moment';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ContextMenuComponent } from 'angular2-contextmenu/src/contextMenu.component';
import { ContextMenuService } from 'angular2-contextmenu/src/contextMenu.service';
import { NodeConst } from '../../models/node.const';

@Component({
    selector: 'node-gallery',
    templateUrl: "./app/node/components/gallery/node.gallery.html",
    providers: [ContextMenuService],
    directives: [ROUTER_DIRECTIVES, ContextMenuComponent],
    pipes: [TimeAgoPipe]
})
export class NodeGalleryComponent {
    @Input() nodes: NodeConst[] = [];
    @Input() items: any[] = [];
    @Output() nodeTableAction = new EventEmitter();

    constructor(private _contextMenuService: ContextMenuService) {
    }

    public onContextMenu($event: MouseEvent, item: any, type: any): void {
        this._contextMenuService.show.next({
            actions: [
                {
                    html: () => `Adını Değiştir`,
                    click: (item) => {
                        this.nodeTableAction.emit({ event: 'rename', type: type, item: item });
                    }
                },
                {
                    html: () => `Taşı`,
                    click: (item) => {
                        this.nodeTableAction.emit({ event: 'move', type: type, item: item });
                    }
                },
                {
                    html: () => `Sil`,
                    click: (item) => {
                        this.nodeTableAction.emit({ event: 'delete', type: type, item: item });
                    }
                }
            ],
            event: $event,
            item: item,
        });
        $event.preventDefault();
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
