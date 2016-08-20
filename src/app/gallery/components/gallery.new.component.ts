import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, NavigationEnd } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle } from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { LoaderAnimation } from '../../common/components/loader.animation';
import { SharedService } from '../../common/services/shared.service';
import { NodeService } from '../../node/services/node.service';
import { NodeConst } from '../../node/models/node.const';
import { FileUploader, FILE_UPLOAD_DIRECTIVES }   from 'ng2-file-upload/ng2-file-upload';

const URL = '';

@Component({
	selector: "gallery-new",
	templateUrl: "./app/gallery/components/gallery.new.html",
	styleUrls: ['./app/gallery/components/gallery.css'],
	directives: [SimpleNotificationsComponent, FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	providers: [NodeService, NotificationsService]
})
export class GalleryNewComponent implements OnInit {
	notificationOptions = {timeOut: 5000, maxStack: 1};
	isDataAvailable:boolean = false;
	public hasBaseDropZoneOver:boolean = false;
	public uploader:FileUploader = new FileUploader({url: URL});
	@ViewChild('uploadEl') uploadElRef: ElementRef;

  constructor(private router: Router,
		private activatedRoute: ActivatedRoute,
		private _sharedService: SharedService,
		private _notificationService: NotificationsService) {
  }

	ngOnInit() {
		this.isDataAvailable = true;
		this.uploader['isHTML5'] = true;

		this.uploader.onAfterAddingFile = (item => {
   		this.uploadElRef.nativeElement.value = '';
  	});
	}

	public fileOverBase(e:any):void {
		this.hasBaseDropZoneOver = e;
	}
}
