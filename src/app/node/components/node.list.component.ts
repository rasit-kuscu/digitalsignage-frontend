import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TimeAgoPipe } from 'angular2-moment';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ControlMessages } from '../../common/components/control.messages';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TreeComponent } from 'angular2-tree-component';
import { NodeService } from '../services/node.service';
import { NodeConst } from '../models/node.const';
import { NodeGalleryComponent } from './gallery/node.gallery.component';
import { Item } from '../models/item';
import { SharedService } from '../../common/services/shared.service';

@Component({
    selector: 'node-list',
    templateUrl: "./app/node/components/node.list.html",
    styleUrls: ['./app/node/components/node.css'],
    providers: [NodeService, NotificationsService],
    directives: [NodeGalleryComponent, ROUTER_DIRECTIVES, TreeComponent, MODAL_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, SimpleNotificationsComponent],
    pipes: [TimeAgoPipe]
})
export class NodeListComponent {
    @Input() type: string;
    @Input() mainUrl: string;
    @Input() thumbnailUrl: string;
    @Input() breadcrumb: any[];
    @Input() currentNode: any;
    @Input() nodes: NodeConst[] = [];
    @Input() items: any[] = [];
    @Output() nodeAction = new EventEmitter();

    @ViewChild('noAccessModal')
    noAccessModal: ModalComponent;

    @ViewChild('nodeEditModal')
    nodeEditModal: ModalComponent;
    @ViewChild('nodeNewModal')
    nodeNewModal: ModalComponent;
    @ViewChild('nodeDeleteModal')
    nodeDeleteModal: ModalComponent;
    @ViewChild('nodeMoveModal')
    nodeMoveModal: ModalComponent;

    @ViewChild('itemRenameModal')
    itemRenameModal: ModalComponent;
    @ViewChild('itemMoveModal')
    itemMoveModal: ModalComponent;
    @ViewChild('itemDeleteModal')
    itemDeleteModal: ModalComponent;
    @ViewChild('itemNewModal')
    itemNewModal: ModalComponent;

    nodeTreeOptions = {
        treeNodeTemplate: '<span class="glyphicon glyphicon-folder-close"></span> {{ node.data.name }}'
    };
    notificationOptions = { timeOut: 5000, maxStack: 1 };
    modalDisableClose: any = 'static';
    isModalProccessing: boolean = false;
    moveSelectNode: any;
    nodeTree: NodeConst[];
    nodeEditForm: any;
    nodeNewForm: any;
    editingNode: any;
    itemNewForm: any;
    itemRenameForm: any;
    editingItem: any;
    updateState: string;

    constructor(private router: Router,
        private _nodeService: NodeService,
        private _notificationService: NotificationsService,
        private formBuilder: FormBuilder,
        private _sharedService: SharedService) {

        this.nodeEditForm = this.formBuilder.group({
            'name': ['', Validators.required]
        });
        this.nodeNewForm = this.formBuilder.group({
            'name': ['', Validators.required]
        });
        this.itemRenameForm = this.formBuilder.group({
            'name': ['', Validators.required]
        });
        this.itemNewForm = this.formBuilder.group({
            'name': ['', Validators.required]
        });
    }

    nodeTableAction($event) {
        let eventType = $event.event;
        if (eventType === 'rename') {
            eventType = 'update';
        }
        if (this._sharedService.checkAuthority(this.type + '_' + eventType.toUpperCase())) {
            if ($event.type === 'node') {
                this.openNodeModal($event.event, 'list', $event.item);
            } else if ($event.type === 'item') {
                this.openItemModal($event.event, 'list', $event.item);
            }
        } else {
            this.noAccessModal.open();
        }
    }

    openNodeModal(type: string, menu: string, node: any) {
        this.updateState = menu;
        this.editingNode = node;
        if (type === 'rename') {
            this.nodeEditForm.controls['name'].updateValue(node['name']);
            this.nodeEditForm.controls['name'].setErrors(null);
            this.nodeEditModal.open();
        } else if (type === 'create') {
            this.nodeNewModal.open();
        } else if (type === 'delete') {
            this.nodeDeleteModal.open();
        } else if (type === 'move') {
            this._nodeService.loadTree('gallery')
                .subscribe(
                (response) => {
                    this.nodeTree = response.data.nodes;
                    this.removeFromTree(this.nodeTree, this.editingNode['id']);
                    this.nodeMoveModal.open();
                },
                error => {
                    console.log(error);
                }
                );
        }
    }

    openItemModalClick() {
        if (this._sharedService.checkAuthority(this.type + '_CREATE')) {
            if (this.type === 'GALLERY') {
                this.nodeAction.emit({ event: 'itemModal', node: null });
            } else {
                this.itemNewModal.open();
            }
        } else {
            this.noAccessModal.open();
        }
    }

    openItemModal(type: string, menu: string, item: any) {
        this.updateState = menu;
        this.editingItem = item;

        if (type === 'rename') {
            this.itemRenameForm.controls['name'].updateValue(item['name']);
            this.itemRenameForm.controls['name'].setErrors(null);
            this.itemRenameModal.open();
        } else if (type === 'delete') {
            this.itemDeleteModal.open();
        } else if (type === 'move') {
            this._nodeService.loadTree('gallery')
                .subscribe(
                (response) => {
                    this.nodeTree = response.data.nodes;
                    if (this.currentNode['parentNode'] != null) {
                        this.removeFromTree(this.nodeTree, this.currentNode['id']);
                    }
                    this.itemMoveModal.open();
                },
                error => {
                    console.log(error);
                }
                );
        }
    }

    onClose() {
        this.editingItem = null;
        this.moveSelectNode = null;
        this.editingNode = null;
        this.nodeNewForm.controls['name'].updateValue('');
        this.nodeNewForm.controls['name'].setErrors(null);
    }

    removeFromTree(nodes: any, id: number) {
        if (nodes) {
            for (let node of nodes) {
                if (node['id'] === id) {
                    let index = nodes.map(function(x) { return x.id; }).indexOf(id);
                    nodes.splice(index, 1);
                    return true;
                }
                this.removeFromTree(node['children'], id);
            }
        }
    }

    onEvent = ($event: any, type: string) => {
        this.moveSelectNode = true;
        if (type === "node") {
            this.editingNode['parentNode']['id'] = $event.node.id;
        } else if (type === "item") {
            this.editingItem['parentNode'] = new NodeConst($event.node.id, null, null, null, null);
        }
    }

    updateNodeName(id: number, name: string) {
        for (let node of this.nodes) {
            if (id === node['id']) {
                node['name'] = name;
            }
        }
    }

    updateItemOnList(id: number, name: string, updatedAt: any) {
        for (let item of this.items) {
            if (id === item['id']) {
                item['name'] = name;
                item['updatedAt'] = updatedAt;
            }
        }
    }

    update() {
        this.isModalProccessing = true;
        this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this._nodeService.update(new NodeConst(this.editingNode['id'], this.nodeEditForm.value.name, this.editingNode['type'], this.editingNode['parentNode'], null))
            .subscribe(
            (response) => {
                this.isModalProccessing = false;
                if (response.status === 'success') {
                    if (this.updateState === 'list') {
                        this.updateNodeName(this.editingNode['id'], this.nodeEditForm.value.name);
                    } else if (this.updateState === 'main') {
                        this.breadcrumb = response.data.breadcrumb;
                        this.currentNode['name'] = this.nodeEditForm.value.name;
                    }
                    this.nodeEditModal.close();
                    this._notificationService.success('İşlem Başarılı', 'Klasör adı başarıyla değiştirildi', {});
                } else if (response.status === 'fail') {
                    this.nodeEditModal.close();
                    if (response.message === 'node_does_not_exist') {
                        this._notificationService.error('Hata', 'Seçmiş olduğunuz node kayıtlı değil', {});
                    } else if (response.message === 'node_name_taken') {
                        this._notificationService.error('Hata', 'Klasör adı zaten kayıtlı', {});
                    } else {
                        this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                    }
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    save() {
        this.isModalProccessing = true;
        this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this._nodeService.save(new NodeConst(0, this.nodeNewForm.value.name, 'gallery', this.currentNode, null))
            .subscribe(
            (response) => {
                this.isModalProccessing = false;
                if (response.status === 'success') {
                    this.nodes.push(new NodeConst(response.data['id'], response.data['name'], response.data['type'], response.data['parentNode'], response.data['lastUpdate']));
                    this.nodeNewModal.close();
                    this._notificationService.success('İşlem Başarılı', 'Yeni klasör başarıyla eklendi', {});
                } else if (response.status === 'fail') {
                    this.nodeNewModal.close();
                    if (response.message === 'node_does_not_exist') {
                        this._notificationService.error('Hata', 'Seçmiş olduğunuz node kayıtlı değil', {});
                    } else if (response.message === 'node_name_taken') {
                        this._notificationService.error('Hata', 'Klasör adı zaten kayıtlı', {});
                    } else {
                        this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                    }
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    delete() {
        this.isModalProccessing = true;
        this._notificationService.alert('Siliniyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this._nodeService.delete(this.editingNode['id'])
            .subscribe(
            (response) => {
                this.isModalProccessing = false;
                if (response.status === 'success') {
                    if (this.updateState === 'list') {
                        let index = this.nodes.map(function(x) { return x.id; }).indexOf(this.editingNode['id']);
                        this.nodes.splice(index, 1);
                    } else if (this.updateState === 'main') {
                        this.nodeAction.emit({ event: 'nodeDeleted', node: this.currentNode });
                    }
                    this.nodeDeleteModal.close();
                    this._notificationService.success('İşlem Başarılı', 'Klasör başarıyla silindi.', {});
                } else {
                    this.nodeDeleteModal.close();
                    this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    move() {
        this.isModalProccessing = true;
        this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this._nodeService.move(new NodeConst(this.editingNode['id'], "empty", this.editingNode['type'], this.editingNode['parentNode'], null))
            .subscribe(
            (response) => {
                this.isModalProccessing = false;
                if (response.status === 'success') {
                    this.nodeAction.emit({ event: 'nodeMoved', node: this.editingNode });
                    this.nodeMoveModal.close();
                    this._notificationService.success('İşlem Başarılı', 'Klasör başarıyla taşındı', {});
                } else if (response.status === 'fail') {
                    this.nodeMoveModal.close();
                    if (response.message === 'node_does_not_exist') {
                        this._notificationService.error('Hata', 'Seçmiş olduğunuz klasör kayıtlı değil', {});
                    } else {
                        this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                    }
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    itemRename() {
        this.isModalProccessing = true;
        this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this._nodeService.itemRename(new Item(this.editingItem['id'], this.itemRenameForm.value.name, this.currentNode, null))
            .subscribe(
            (response) => {
                this.isModalProccessing = false;
                if (response.status === 'success') {
                    this.updateItemOnList(response.data['id'], response.data['name'], response.data['updatedAt']);
                    this.itemRenameModal.close();
                    this._notificationService.success('İşlem Başarılı', 'Adı başarıyla değiştirildi', {});
                } else if (response.status === 'fail') {
                    this.itemRenameModal.close();
                    if (response.message === 'item_does_not_exist') {
                        this._notificationService.error('Hata', 'Seçmiş olduğunuz  kayıtlı değil', {});
                    } else if (response.message === 'item_name_taken') {
                        this._notificationService.error('Hata', 'Seçmiş olduğunuz ad zaten kayıtlı', {});
                    } else {
                        this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                    }
                }
            },
            error => {
                console.log(error);
            }
            );
    }

    itemMove() {
        this.isModalProccessing = true;
        this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this._nodeService.itemMove(this.editingItem)
            .subscribe(
            (response) => {
                this.isModalProccessing = false;
                if (response.status === 'success') {
                    this.nodeAction.emit({ event: 'itemMoved', item: this.editingItem });
                    this.itemMoveModal.close();
                    this._notificationService.success('İşlem Başarılı', 'Başarıyla taşındı', {});
                } else if (response.status === 'fail') {
                    this.itemMoveModal.close();
                    if (response.message === 'item_does_not_exist') {
                        this._notificationService.error('Hata', 'Seçmiş olduğunuz kayıtlı değil', {});
                    } else {
                        this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                    }
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }

    itemDelete() {
        this.isModalProccessing = true;
        this._notificationService.alert('Siliniyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
        this._nodeService.itemDelete(this.editingItem['id'])
            .subscribe(
            (response) => {
                this.isModalProccessing = false;
                if (response.status === 'success') {
                    let index = this.items.map(function(x) { return x.id; }).indexOf(this.editingItem['id']);
                    this.items.splice(index, 1);
                    this.itemDeleteModal.close();
                    this._notificationService.success('İşlem Başarılı', 'Başarıyla silindi.', {});
                } else {
                    this.itemDeleteModal.close();
                    this._notificationService.error('Hata', 'Bir şeyler yalnış gitti.', {});
                }
            },
            error => {
                this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
            }
            );
    }
}
