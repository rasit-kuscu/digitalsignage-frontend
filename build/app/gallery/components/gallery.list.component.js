System.register(["@angular/core", '@angular/common', '@angular/router', '@angular/forms', 'ng2-bs3-modal/ng2-bs3-modal', 'angular2-notifications', '../../common/components/control.messages', '../../common/services/shared.service', '../../node/services/node.service', '../../node/models/node.const', 'angular2-moment', 'angular2-contextmenu/src/contextMenu.component', 'angular2-contextmenu/src/contextMenu.service', 'angular2-tree-component', 'ng2-file-upload/ng2-file-upload'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, router_1, forms_1, ng2_bs3_modal_1, angular2_notifications_1, control_messages_1, shared_service_1, node_service_1, node_const_1, angular2_moment_1, contextMenu_component_1, contextMenu_service_1, angular2_tree_component_1, ng2_file_upload_1;
    var GalleryListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (ng2_bs3_modal_1_1) {
                ng2_bs3_modal_1 = ng2_bs3_modal_1_1;
            },
            function (angular2_notifications_1_1) {
                angular2_notifications_1 = angular2_notifications_1_1;
            },
            function (control_messages_1_1) {
                control_messages_1 = control_messages_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            },
            function (node_service_1_1) {
                node_service_1 = node_service_1_1;
            },
            function (node_const_1_1) {
                node_const_1 = node_const_1_1;
            },
            function (angular2_moment_1_1) {
                angular2_moment_1 = angular2_moment_1_1;
            },
            function (contextMenu_component_1_1) {
                contextMenu_component_1 = contextMenu_component_1_1;
            },
            function (contextMenu_service_1_1) {
                contextMenu_service_1 = contextMenu_service_1_1;
            },
            function (angular2_tree_component_1_1) {
                angular2_tree_component_1 = angular2_tree_component_1_1;
            },
            function (ng2_file_upload_1_1) {
                ng2_file_upload_1 = ng2_file_upload_1_1;
            }],
        execute: function() {
            GalleryListComponent = (function () {
                function GalleryListComponent(router, activatedRoute, _sharedService, _nodeService, formBuilder, _notificationService, contextMenuService) {
                    var _this = this;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this._sharedService = _sharedService;
                    this._nodeService = _nodeService;
                    this.formBuilder = formBuilder;
                    this._notificationService = _notificationService;
                    this.contextMenuService = contextMenuService;
                    this.notificationOptions = { timeOut: 5000, maxStack: 1 };
                    this.isDataAvailable = false;
                    this.isTableAvailable = false;
                    this.isModalProccessing = false;
                    this.modalDisableClose = 'static';
                    this.modalDisableCloseKeyboard = false;
                    this.moveSelectNode = false;
                    this.hasBaseDropZoneOver = false;
                    this.customTemplateStringOptions = {
                        treeNodeTemplate: '<span class="glyphicon glyphicon-folder-close"></span> {{ node.data.name }}'
                    };
                    this.onEvent = function ($event) {
                        _this.moveSelectNode = true;
                        _this.editingNode['parentNode']['id'] = $event.node.id;
                    };
                    this.uploader = new ng2_file_upload_1.FileUploader({
                        url: 'http://localhost:8080/api/gallery/upload',
                        authToken: 'Bearer ' + localStorage.getItem('id_token'),
                        allowedMimeType: ['image/png', 'image/gif', 'video/mp4', 'image/jpeg'],
                        removeAfterUpload: true
                    });
                    this.uploader.onCompleteAll = function () {
                        console.log('complete');
                    };
                    this.uploader.onCompleteItem = function (item, response, status, headers) {
                        var responsePath = JSON.parse(response);
                        _this.items.push(responsePath[0]);
                    };
                }
                GalleryListComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.uploader.onAfterAddingFile = (function (item) {
                        _this.uploadElRef.nativeElement.value = '';
                    });
                };
                GalleryListComponent.prototype.fileOverBase = function (e) {
                    this.hasBaseDropZoneOver = e;
                };
                GalleryListComponent.prototype.onContextMenu = function ($event, item, type) {
                    var _this = this;
                    this.contextMenuService.show.next({
                        actions: [
                            {
                                html: function () { return "Ad\u0131n\u0131 De\u011Fi\u015Ftir"; },
                                click: function (item) {
                                    if (type === 'node') {
                                        _this.openNodeModal('edit', 'sub', item);
                                    }
                                    else if (type === 'item') {
                                        console.log('item rename');
                                    }
                                }
                            },
                            {
                                html: function () { return "Ta\u015F\u0131"; },
                                click: function (item) {
                                    if (type === 'node') {
                                        _this.openNodeModal('move', 'sub', item);
                                    }
                                    else if (type === 'item') {
                                        console.log('item move');
                                    }
                                }
                            },
                            {
                                html: function () { return "Sil"; },
                                click: function (item) {
                                    if (type === 'node') {
                                        _this.openNodeModal('delete', 'sub', item);
                                    }
                                    else if (type === 'item') {
                                        console.log('item remove');
                                    }
                                }
                            }
                        ],
                        event: $event,
                        item: item,
                    });
                    $event.preventDefault();
                };
                GalleryListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.uploader['isHTML5'] = true;
                    var id = 0;
                    this.activatedRoute.params
                        .map(function (params) { return params['id']; })
                        .subscribe(function (id) {
                        if (typeof id === 'undefined') {
                            id = 0;
                        }
                        _this.load(id);
                        _this.uploader.onBuildItemForm = function (item, form) {
                            form.append('nodeId', _this.currentNode['id']);
                        };
                    });
                    this.newNodeForm = this.formBuilder.group({
                        'name': ['', forms_1.Validators.required]
                    });
                    this.editNodeForm = this.formBuilder.group({
                        'name': ['', forms_1.Validators.required]
                    });
                };
                GalleryListComponent.prototype.updateNodeName = function (id, name) {
                    for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                        var node = _a[_i];
                        if (id === node['id']) {
                            node['name'] = name;
                        }
                    }
                };
                GalleryListComponent.prototype.removeFromTree = function (nodes, id) {
                    if (nodes) {
                        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                            var node = nodes_1[_i];
                            if (node['id'] === id) {
                                var index = nodes.map(function (x) { return x.id; }).indexOf(id);
                                nodes.splice(index, 1);
                                return true;
                            }
                            this.removeFromTree(node['children'], id);
                        }
                    }
                };
                GalleryListComponent.prototype.load = function (id) {
                    var _this = this;
                    this.isTableAvailable = false;
                    this._nodeService.load(id, 'gallery')
                        .subscribe(function (response) {
                        _this.breadcrumb = response.data.breadcrumb;
                        _this.currentNode = response.data.node;
                        _this.nodes = response.data.nodes;
                        _this.items = _this.currentNode['item'];
                        _this.isTableAvailable = true;
                        _this.isDataAvailable = true;
                    }, function (error) {
                        console.log(error);
                    });
                };
                GalleryListComponent.prototype.openNodeModal = function (type, menu, node) {
                    var _this = this;
                    this.updateState = menu;
                    this.editingNode = node;
                    if (type === 'edit') {
                        this.editNodeForm.controls['name'].updateValue(node['name']);
                        this.editNodeForm.controls['name'].setErrors(null);
                        this.nodeEditModal.open();
                    }
                    else if (type === 'new') {
                        this.nodeNewModal.open();
                    }
                    else if (type === 'delete') {
                        this.nodeDeleteModal.open();
                    }
                    else if (type === 'move') {
                        this._nodeService.loadTree('gallery')
                            .subscribe(function (response) {
                            _this.nodeTree = response.data.nodes;
                            _this.removeFromTree(_this.nodeTree, _this.editingNode['id']);
                            _this.nodeMoveModal.open();
                        }, function (error) {
                            console.log(error);
                        });
                    }
                    else if (type === 'upload') {
                        this.nodeUploadModal.open('lg');
                    }
                };
                GalleryListComponent.prototype.onClose = function () {
                    this.uploader.clearQueue();
                    this.moveSelectNode = null;
                    this.editingNode = null;
                    this.newNodeForm.controls['name'].updateValue('');
                    this.newNodeForm.controls['name'].setErrors(null);
                };
                GalleryListComponent.prototype.save = function () {
                    var _this = this;
                    this.isModalProccessing = true;
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this._nodeService.save(new node_const_1.NodeConst(0, this.newNodeForm.value.name, 'gallery', this.currentNode, null))
                        .subscribe(function (response) {
                        _this.isModalProccessing = false;
                        if (response.status === 'success') {
                            _this.nodeNewModal.close();
                            _this.nodes.push(new node_const_1.NodeConst(response.data['id'], response.data['name'], response.data['type'], response.data['parentNode'], response.data['lastUpdate']));
                            _this._notificationService.success('İşlem Başarılı', 'Yeni klasör başarıyla eklendi', {});
                        }
                        else if (response.status === 'fail') {
                            if (response.message === 'node_does_not_exist') {
                                _this._notificationService.error('Hata', 'Seçmiş olduğunuz node kayıtlı değil', {});
                            }
                            else if (response.message === 'node_name_taken') {
                                _this._notificationService.error('Hata', 'Klasör adı zaten kayıtlı', {});
                            }
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                GalleryListComponent.prototype.update = function () {
                    var _this = this;
                    this.isModalProccessing = true;
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this._nodeService.update(new node_const_1.NodeConst(this.editingNode['id'], this.editNodeForm.value.name, this.editingNode['type'], this.editingNode['parentNode'], null))
                        .subscribe(function (response) {
                        _this.isModalProccessing = false;
                        if (response.status === 'success') {
                            if (_this.updateState === 'main') {
                                _this.breadcrumb = response.data.breadcrumb;
                                _this.currentNode['name'] = _this.editNodeForm.value.name;
                            }
                            else {
                                _this.updateNodeName(_this.editingNode['id'], _this.editNodeForm.value.name);
                            }
                            _this.nodeEditModal.close();
                            _this.editingNode = null;
                            _this._notificationService.success('İşlem Başarılı', 'Klasör adı başarıyla değiştirildi', {});
                        }
                        else if (response.status === 'fail') {
                            if (response.message === 'node_does_not_exist') {
                                _this._notificationService.error('Hata', 'Seçmiş olduğunuz node kayıtlı değil', {});
                            }
                            else if (response.message === 'node_name_taken') {
                                _this._notificationService.error('Hata', 'Klasör adı zaten kayıtlı', {});
                            }
                        }
                    }, function (error) {
                        console.log(error);
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                GalleryListComponent.prototype.move = function () {
                    var _this = this;
                    this.isModalProccessing = true;
                    this._notificationService.alert('Kaydediliyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this._nodeService.move(new node_const_1.NodeConst(this.editingNode['id'], "empty", this.editingNode['type'], this.editingNode['parentNode'], null))
                        .subscribe(function (response) {
                        _this.isModalProccessing = false;
                        if (response.status === 'success') {
                            _this.load(_this.editingNode['parentNode']['id']);
                            _this.nodeMoveModal.close();
                            _this.editingNode = null;
                            _this._notificationService.success('İşlem Başarılı', 'Klasör başarıyla taşındı', {});
                        }
                        else if (response.status === 'fail') {
                            if (response.message === 'node_does_not_exist') {
                                _this._notificationService.error('Hata', 'Seçmiş olduğunuz klasör kayıtlı değil', {});
                            }
                        }
                    }, function (error) {
                        console.log(error);
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                GalleryListComponent.prototype.delete = function () {
                    var _this = this;
                    this.isModalProccessing = true;
                    this._notificationService.alert('Siliniyor', 'İşleminiz yapılıyor, lütfen bekleyiniz.', { timeOut: 0, clickToClose: false });
                    this._nodeService.delete(this.editingNode['id'])
                        .subscribe(function (response) {
                        _this.isModalProccessing = false;
                        if (response.status === 'success') {
                            if (_this.updateState === 'sub') {
                                var index = _this.nodes.map(function (x) { return x.id; }).indexOf(_this.editingNode['id']);
                                _this.nodes.splice(index, 1);
                            }
                            else if (_this.updateState === 'main') {
                                _this.load(_this.currentNode['parentNode']['id']);
                            }
                            _this.nodeDeleteModal.close();
                            _this._notificationService.success('İşlem Başarılı', 'Klasör başarıyla silindi.', {});
                        }
                        else {
                            _this.router.navigate(['/error', { status: response.status, message: encodeURIComponent(response.message) }]);
                        }
                    }, function (error) {
                        _this.router.navigate(['/error', { status: error.status, message: encodeURIComponent(error._body) }]);
                    });
                };
                GalleryListComponent.prototype.humanFileSize = function (bytes, si) {
                    var thresh = si ? 1000 : 1024;
                    if (Math.abs(bytes) < thresh) {
                        return bytes + ' B';
                    }
                    var units = si
                        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
                        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
                    var u = -1;
                    do {
                        bytes /= thresh;
                        ++u;
                    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
                    return bytes.toFixed(1) + ' ' + units[u];
                };
                __decorate([
                    core_1.ViewChild('nodeEditModal'), 
                    __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
                ], GalleryListComponent.prototype, "nodeEditModal", void 0);
                __decorate([
                    core_1.ViewChild('nodeNewModal'), 
                    __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
                ], GalleryListComponent.prototype, "nodeNewModal", void 0);
                __decorate([
                    core_1.ViewChild('nodeDeleteModal'), 
                    __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
                ], GalleryListComponent.prototype, "nodeDeleteModal", void 0);
                __decorate([
                    core_1.ViewChild('nodeMoveModal'), 
                    __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
                ], GalleryListComponent.prototype, "nodeMoveModal", void 0);
                __decorate([
                    core_1.ViewChild('nodeUploadModal'), 
                    __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
                ], GalleryListComponent.prototype, "nodeUploadModal", void 0);
                __decorate([
                    core_1.ViewChild('uploadEl'), 
                    __metadata('design:type', core_1.ElementRef)
                ], GalleryListComponent.prototype, "uploadElRef", void 0);
                GalleryListComponent = __decorate([
                    core_1.Component({
                        selector: "gallery-main",
                        templateUrl: "./app/gallery/components/gallery.list.html",
                        styleUrls: ['./app/gallery/components/gallery.css'],
                        directives: [ng2_file_upload_1.FILE_UPLOAD_DIRECTIVES,
                            common_1.NgClass,
                            common_1.NgStyle,
                            angular2_tree_component_1.TreeComponent,
                            router_1.ROUTER_DIRECTIVES,
                            ng2_bs3_modal_1.MODAL_DIRECTIVES,
                            forms_1.REACTIVE_FORM_DIRECTIVES,
                            control_messages_1.ControlMessages,
                            angular2_notifications_1.SimpleNotificationsComponent,
                            contextMenu_component_1.ContextMenuComponent],
                        providers: [node_service_1.NodeService, angular2_notifications_1.NotificationsService, contextMenu_service_1.ContextMenuService],
                        pipes: [angular2_moment_1.TimeAgoPipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, shared_service_1.SharedService, node_service_1.NodeService, forms_1.FormBuilder, angular2_notifications_1.NotificationsService, contextMenu_service_1.ContextMenuService])
                ], GalleryListComponent);
                return GalleryListComponent;
            }());
            exports_1("GalleryListComponent", GalleryListComponent);
        }
    }
});

//# sourceMappingURL=gallery.list.component.js.map
