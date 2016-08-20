import { EventEmitter } from '@angular/core';
import { ContextMenuService } from './contextMenu.service';
export interface ILinkConfig {
    html: () => string;
    click: (item: any, $event?: MouseEvent) => void;
    enabled?: (item: any) => boolean;
}
export declare class ContextMenuComponent {
    private _contextMenuService;
    useBootstrap4: boolean;
    close: EventEmitter<any>;
    links: ILinkConfig[];
    isShown: boolean;
    isOpening: boolean;
    item: any;
    private mouseLocation;
    constructor(_contextMenuService: ContextMenuService);
    locationCss: any;
    clickedOutside(): void;
    isDisabled(link: ILinkConfig): boolean;
    execute(link: ILinkConfig, $event?: MouseEvent): void;
    showMenu(event: MouseEvent, actions: any[], item: any): void;
    hideMenu(): void;
}
