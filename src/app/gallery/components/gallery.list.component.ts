import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle } from '@angular/common';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, NavigationEnd } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DialogRef } from 'angular2-modal';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { ValidationService } from '../../common/services/validation.service';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { ControlMessages } from '../../common/components/control.messages';
import { SharedService } from '../../common/services/shared.service';
import { NodeService } from '../../node/services/node.service';
import { Node } from '../../node/models/node';
import { NodeConst } from '../../node/models/node.const';
import { TimeAgoPipe } from 'angular2-moment';
import { ContextMenuComponent } from 'angular2-contextmenu/src/contextMenu.component';
import { ContextMenuService } from 'angular2-contextmenu/src/contextMenu.service';
import { TreeComponent } from 'angular2-tree-component';
import { FileUploader, FILE_UPLOAD_DIRECTIVES }   from 'ng2-file-upload/ng2-file-upload';

@Component({
	selector: "gallery-main",
	templateUrl: "./app/gallery/components/gallery.list.html",
	styleUrls: ['./app/gallery/components/gallery.css'],
	directives: [FILE_UPLOAD_DIRECTIVES,
		NgClass,
		NgStyle,
		TreeComponent,
		ROUTER_DIRECTIVES,
		MODAL_DIRECTIVES,
		REACTIVE_FORM_DIRECTIVES,
		ControlMessages,
		SimpleNotificationsComponent,
		ContextMenuComponent],
	providers: [NodeService, NotificationsService, ContextMenuService],
	pipes: [TimeAgoPipe]
})
export class GalleryListComponent implements OnInit {
	notificationOptions = {timeOut: 5000, maxStack: 1};
	isDataAvailable:boolean = false;
	isTableAvailable:boolean = false;
	nodes: NodeConst[];
	nodeTree: NodeConst[];
	breadcrumb: any[];
	items: any[];
	currentNode: any;
	editingNode: NodeConst;
	sub:any;
	@ViewChild('nodeEditModal')
	nodeEditModal: ModalComponent;
	@ViewChild('nodeNewModal')
	nodeNewModal: ModalComponent;
	@ViewChild('nodeDeleteModal')
	nodeDeleteModal: ModalComponent;
	@ViewChild('nodeMoveModal')
	nodeMoveModal: ModalComponent;
	@ViewChild('nodeUploadModal')
	nodeUploadModal: ModalComponent;
	newNodeForm:any;
	editNodeForm:any;
	isModalProccessing:boolean = false;
	modalDisableClose:any = 'static';
	modalDisableCloseKeyboard: boolean = false;
	updateState:string;
	moveSelectNode: boolean = false;
	public hasBaseDropZoneOver:boolean = false;
	public uploader:FileUploader;
	@ViewChild('uploadEl') uploadElRef: ElementRef;

	customTemplateStringOptions = {
    treeNodeTemplate: '<span class="glyphicon glyphicon-folder-close"></span> {{ node.data.name }}'
  };

  constructor(private router: Router,
		private activatedRoute: ActivatedRoute,
		private _sharedService: SharedService,
		private _nodeService: NodeService,
		private formBuilder: FormBuilder,
		private _notificationService: NotificationsService,
		private contextMenuService: ContextMenuService) {
			this.uploader = new FileUploader({
				url: 'https://evening-anchorage-3159.herokuapp.com/api/',
				allowedMimeType: ['image/png', 'image/gif', 'video/mp4', 'image/jpeg']
			});
			this.uploader.onCompleteAll = () => {
    		console.log('complete');
  		};
  }

	ngAfterViewInit() {
	 this.uploader.onAfterAddingFile = (item => {
	   this.uploadElRef.nativeElement.value = '';
	  });
	}

	public fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}

	public onContextMenu($event: MouseEvent, item: any): void {
		this.contextMenuService.show.next({
      actions: [
        {
          html: () => `Adını Değiştir`,
          click: (item) =>  {
						this.openNodeModal('edit', 'sub', item);
					}
        },
        {
          html: () => `Taşı`,
          click: (item) => {
						this.openNodeModal('move', 'sub', item);
					}
        },
				{
          html: () => `Sil`,
          click: (item) => {
						this.openNodeModal('delete', 'sub', item);
					}
        }
      ],
      event: $event,
      item: item,
    });
    $event.preventDefault();
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
      });

			this.newNodeForm = this.formBuilder.group({
				'name': ['', Validators.required]
			});

			this.editNodeForm = this.formBuilder.group({
				'name': ['', Validators.required]
			});
	}

	onEvent = ($event:any) => {
		this.moveSelectNode = true;
		this.editingNode['parentNode']['id'] = $event.node.id;
	}

	updateNodeName(id:number, name: string) {
		for (let node of this.nodes) {
			if (id === node['id']) {
				node['name'] = name;
			}
		}
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

	load(id: number) {
		this.isTableAvailable = false;
		this._nodeService.load(id, 'gallery')
		.subscribe(
			(response) => {
				this.breadcrumb = response.data.breadcrumb;
				this.currentNode = response.data.node;
				this.nodes = response.data.nodes;
				this.items = ['item1', 'item2'];

				this.isTableAvailable = true;
				this.isDataAvailable = true;
			},
			error => {
				console.log(error);
			}
		);
	}

	openNodeModal(type: string, menu: string, node: any) {
		this.updateState = menu;
		this.editingNode = node;
		if (type === 'edit') {
			this.editNodeForm.controls['name'].updateValue(node['name']);
			this.editNodeForm.controls['name'].setErrors(null);
			this.nodeEditModal.open();
		} else if (type === 'new') {
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
		} else if (type === 'upload') {
			this.nodeUploadModal.open('lg');
		}
	}

	onClose() {
		this.uploader.clearQueue();
		this.moveSelectNode = null;
		this.editingNode = null;
		this.newNodeForm.controls['name'].updateValue('');
		this.newNodeForm.controls['name'].setErrors(null);
	}

	save() {
		this.isModalProccessing = true;
		this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', {timeOut:0, clickToClose:false});
		this._nodeService.save(new NodeConst(0, this.newNodeForm.value.name, 'gallery', this.currentNode, null))
		.subscribe(
			(response) => {
				this.isModalProccessing = false;
				if (response.status === 'success') {
					this.nodeNewModal.close();
					this.nodes.push(new NodeConst(response.data['id'], response.data['name'], response.data['type'], response.data['parentNode'], response.data['lastUpdate']));
					this._notificationService.success('İşlem Başarılı', 'Yeni klasör başarıyla eklendi', {});
				} else if (response.status === 'fail') {
					if (response.message === 'node_does_not_exist') {
						this._notificationService.error('Hata', 'Seçmiş olduğunuz node kayıtlı değil', {});
					} else if (response.message === 'node_name_taken') {
						this._notificationService.error('Hata', 'Klasör adı zaten kayıtlı', {});
					}
				}
			},
			error => {
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error._body)}]);
			}
		);
	}

	update() {
		this.isModalProccessing = true;
		this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', {timeOut:0, clickToClose:false});
		this._nodeService.update(new NodeConst(this.editingNode['id'], this.editNodeForm.value.name, this.editingNode['type'], this.editingNode['parentNode'], null))
		.subscribe(
			(response) => {
				this.isModalProccessing = false;
				if (response.status === 'success') {
					if (this.updateState === 'main') {
						this.breadcrumb = response.data.breadcrumb;
						this.currentNode['name'] = this.editNodeForm.value.name;
					} else {
						this.updateNodeName(this.editingNode['id'], this.editNodeForm.value.name);
					}
					this.nodeEditModal.close();
					this.editingNode = null;
					this._notificationService.success('İşlem Başarılı', 'Klasör adı başarıyla değiştirildi', {});
				} else if (response.status === 'fail') {
					if (response.message === 'node_does_not_exist') {
						this._notificationService.error('Hata', 'Seçmiş olduğunuz node kayıtlı değil', {});
					} else if (response.message === 'node_name_taken') {
						this._notificationService.error('Hata', 'Klasör adı zaten kayıtlı', {});
					}
				}
			},
			error => {
				console.log(error);
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error._body)}]);
			}
		);
	}

	move() {
		this.isModalProccessing = true;
		this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', {timeOut:0, clickToClose:false});
		this._nodeService.move(new NodeConst(this.editingNode['id'], "empty", this.editingNode['type'], this.editingNode['parentNode'], null))
		.subscribe(
			(response) => {
				this.isModalProccessing = false;
				if (response.status === 'success') {
					this.load(this.editingNode['parentNode']['id']);
					this.nodeMoveModal.close();
					this.editingNode = null;
					this._notificationService.success('İşlem Başarılı', 'Klasör başarıyla taşındı', {});
				} else if (response.status === 'fail') {
					if (response.message === 'node_does_not_exist') {
						this._notificationService.error('Hata', 'Seçmiş olduğunuz klasör kayıtlı değil', {});
					}
				}
			},
			error => {
				console.log(error);
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error._body)}]);
			}
		);
	}

	delete() {
		this.isModalProccessing = true;
		this._notificationService.alert('Siliniyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', {timeOut:0, clickToClose:false});
		this._nodeService.delete(this.editingNode['id'])
		.subscribe(
			(response) => {
				this.isModalProccessing = false;
				if (response.status === 'success') {
					if (this.updateState === 'sub') {
						let index = this.nodes.map(function(x) {return x.id; }).indexOf(this.editingNode['id']);
    				this.nodes.splice(index, 1);
					} else if (this.updateState === 'main') {
						this.load(this.currentNode['parentNode']['id']);
					}
					this.nodeDeleteModal.close();
					this._notificationService.success('İşlem Başarılı', 'Klasör başarıyla silindi.', {});
				} else {
					this.router.navigate(['/error', {status: response.status, message: encodeURIComponent(response.message)}]);
				}
			},
			error => {
				this.router.navigate(['/error', {status: error.status, message: encodeURIComponent(error._body)}]);
			}
		);
	}
}
