import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, AfterViewChecked } from "@angular/core";
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle } from '@angular/common';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, NavigationEnd } from '@angular/router';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { SharedService } from '../../common/services/shared.service';
import { NodeService } from '../../node/services/node.service';
import { Node } from '../../node/models/node';
import { NodeConst } from '../../node/models/node.const';
import { Layer } from '../models/layer';
import { ValidationService } from '../../common/services/validation.service';
import { ControlMessages } from '../../common/components/control.messages';

declare var jQuery: any;

@Component({
    selector: "designer-main",
    templateUrl: "./app/designer/components/designer.edit.html",
    styleUrls: ['./app/designer/components/designer.css'],
    directives: [
        NgClass,
        NgStyle,
        ROUTER_DIRECTIVES,
        MODAL_DIRECTIVES,
        REACTIVE_FORM_DIRECTIVES,
        SimpleNotificationsComponent,
        ControlMessages
    ],
    providers: [NodeService, NotificationsService]
})
export class DesignerEditComponent implements OnInit {
    @ViewChild('updateLayerModal')
    updateLayerModal: ModalComponent;

    modalDisableClose: any = 'static';
    isModalProccessing: boolean = false;

    notificationOptions = { timeOut: 5000, maxStack: 1 };
    elementRef: ElementRef;
    limitReached: boolean = false;
    layerUpdateForm: any;

    layers: Layer[] = [];
    layerColors: string[] = [
        '#DA587A',
        '#5562AA',
        '#59808F',
        '#CA645C',
        '#C6D8AF',
        '#8DFFCD',
        '#685369',
        '#F0D17E',
        '#403233',
        '#878472',
        '#3C4945',
        '#D6D6B1',
        '#121509',
        '#7EA0B7'
    ];
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private _sharedService: SharedService,
        private _nodeService: NodeService,
        private formBuilder: FormBuilder,
        private _notificationService: NotificationsService,
        @Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    ngOnInit() {
        this.layerUpdateForm = this.formBuilder.group({
            'name': ['', Validators.required],
            'width': ['', [Validators.required, ValidationService.integerValidator]],
            'height': ['', [Validators.required, ValidationService.integerValidator]],
            'top': ['', [Validators.required, ValidationService.integerValidator]],
            'left': ['', [Validators.required, ValidationService.integerValidator]]
        });
    }

    ngAfterViewChecked() {
        var element = jQuery(this.elementRef.nativeElement);
        var sortable = element.find('.sortable');
        var designerLayerActions = element.find('.designerAreaLayer');
        var layers = this.layers;

        sortable.sortable({
            handle: '.glyphicon-resize-vertical',
            cancel: 'a',
            helper: 'clone',
            stop: function(event, ui) {
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers.filter((layer) => layer['id'] === event.target.children[i].dataset.id)[0];
                    layer['zindex'] = layers.length - i;
                }
            }
        });

        designerLayerActions.draggable({
            revert: false,
            scroll: true,
            containment: 'parent',
            stop: function(event, ui) {
                var id = ui.helper.context.dataset.id;
                var layer = layers.filter((layer) => layer.id === id)[0];
                layer['top'] = ui.position.top;
                layer['left'] = ui.position.left;
            }
        });

        designerLayerActions.resizable({
            containment: 'parent',
            minWidth: 50,
            minHeight: 50,
            stop: function(event, ui) {
                var id = ui.helper.context.dataset.id;
                var layer = layers.filter((layer) => layer['id'] === id)[0];
                layer['width'] = ui.size.width;
                layer['height'] = ui.size.height;
            }
        });

        this.layers = layers;
    }

    ngAfterViewInit() {
        this.calculateDesignerAreaSize();
    }

    calculateDesignerAreaSize() {
        var element = jQuery(this.elementRef.nativeElement);
        var designerArea = element.find('.designer-area');
        var footerHeight = 60 + 15; // 60: footer, 15: margin top

        var designerAreaBorderLeft = Math.round(parseFloat(designerArea.css('border-left-width')));
        var designerAreaBorderTop = Math.round(parseFloat(designerArea.css('border-top-width')));

        var designerAreaHeight = document.documentElement.clientHeight - (designerArea.offset().top + footerHeight + designerAreaBorderLeft + designerAreaBorderTop);
        var designerAreaWidth = document.documentElement.clientWidth - (designerArea.offset().left + designerAreaBorderLeft + 15);

        designerArea.css({ width: designerAreaWidth + 'px' });
        designerArea.css({ height: designerAreaHeight + 'px' });

        for (var i = 0; i < this.layers.length; i++) {
            let newWidth = (this.layers[i]['width'] * document.documentElement.clientWidth) / this.layers[i]['screenWidth'];
            let newHeight = (this.layers[i]['height'] * document.documentElement.clientHeight) / this.layers[i]['screenHeight'];
            this.layers[i]['width'] = newWidth;
            this.layers[i]['height'] = newHeight;
            this.layers[i]['screenWidth'] = document.documentElement.clientWidth;
            this.layers[i]['screenHeight'] = document.documentElement.clientHeight;
            element.find('#' + this.layers[i]['id']).css({ width: newWidth + 'px', height: newHeight + 'px' });
        }
    }

    onResize(event) {
        this.calculateDesignerAreaSize();
    }

    _updateLayer(layer: Layer) {
        this.layerUpdateForm.controls['name'].updateValue(layer['name']);
        this.layerUpdateForm.controls['name'].setErrors(null);
        this.layerUpdateForm.controls['width'].updateValue(layer['width']);
        this.layerUpdateForm.controls['width'].setErrors(null);
        this.layerUpdateForm.controls['height'].updateValue(layer['height']);
        this.layerUpdateForm.controls['height'].setErrors(null);
        this.layerUpdateForm.controls['top'].updateValue(layer['top']);
        this.layerUpdateForm.controls['top'].setErrors(null);
        this.layerUpdateForm.controls['left'].updateValue(layer['left']);
        this.layerUpdateForm.controls['left'].setErrors(null);
        this.updateLayerModal.open();
    }

    _deleteLayer(layer: Layer) {
        if (this.layerColors.length >= this.layers.length) {
            this.limitReached = false;
        }

        var index = this.layers.indexOf(layer);
        this.layers.splice(index, 1);
    }

    _newLayer() {
        if (this.layerColors.length === this.layers.length) {
            this.limitReached = true;
        } else {
            let layer: Layer = new Layer();
            layer['id'] = this._generateGuid();
            layer['name'] = 'Katman ' + this.layers.length;
            layer['width'] = 100;
            layer['height'] = 100;
            layer['top'] = 0;
            layer['left'] = 0;
            layer['zindex'] = this.layers.length;
            layer['color'] = this.layerColors[this.layers.length];
            layer['screenWidth'] = document.documentElement.clientWidth;
            layer['screenHeight'] = document.documentElement.clientHeight;
            this.layers.push(layer);

            var i = 0;
            for (let dump of this.layers) {
                dump.zindex = this.layers.length - i;
                i++;
            }
        }
    }

    _save() {
        console.log(this.layers);
    }

    _generateGuid(): string {
        return new Date().getTime().toString();
    }

    onClose() {

    }
}
