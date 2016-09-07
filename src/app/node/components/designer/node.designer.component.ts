import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TimeAgoPipe } from 'angular2-moment';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ContextMenuComponent } from 'angular2-contextmenu/src/contextMenu.component';
import { ContextMenuService } from 'angular2-contextmenu/src/contextMenu.service';
import { NodeConst } from '../../models/node.const';

@Component({
    selector: 'node-designer',
    templateUrl: "./app/node/components/designer/node.designer.html",
    providers: [ContextMenuService],
    directives: [ROUTER_DIRECTIVES, ContextMenuComponent],
    pipes: [TimeAgoPipe]
})
export class NodeDesignerComponent {
    @Input() nodes: NodeConst[] = [];
    @Input() items: any[] = [];
    @Output() nodeTableAction = new EventEmitter();
    menuOptions = [];

    constructor(private router: Router, private _contextMenuService: ContextMenuService) {
    }

    public onContextMenu($event: MouseEvent, item: any, type: any): void {
        this._contextMenuService.show.next({
            actions: [
                {
                    html: () => `Düzenle`,
                    click: (item) => {
                        this.router.navigate(['/designer', 'edit', { id: item.id }]);
                    }
                },
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
}
