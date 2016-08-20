import { Component, OnInit } from "@angular/core";
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { SharedService } from '../../common/services/shared.service';

@Component({
	selector: "page-error",
	templateUrl: "./app/errorpages/components/page.error.html",
	styleUrls: ['./app/errorpages/components/error.css'],
	directives: [ROUTER_DIRECTIVES]
})
export class PageError implements OnInit {
	message: string;
	needLogin: boolean = false;
	needPermission: boolean = false;

  constructor(public router:Router, public _sharedService: SharedService, private activatedRoute: ActivatedRoute) {
  }

	ngOnInit() {
		let ifJson = false;
		this.message = decodeURIComponent(this.activatedRoute.snapshot.params['message']);
		try {
        this.message = JSON.parse(this.message);
				ifJson = true;
    } catch (e) {
        ifJson = false;
    }

		if (ifJson) {
			if (this.message['error'] === 'Unauthorized' && this.message['message'] === 'Access Denied') {
				this.needLogin = true;
				localStorage.removeItem('id_token');
			} else if (this.message['error'] === 'Forbidden' && this.message['exception'] === 'org.springframework.security.access.AccessDeniedException') {
				this.needPermission = true;
			}
		}
	}
}
