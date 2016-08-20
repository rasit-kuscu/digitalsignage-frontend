import { Component, OnInit } from "@angular/core";
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, NavigationEnd } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SharedService } from '../common/services/shared.service';

@Component({
	selector: "item-main",
	templateUrl: "./app/item/item.main.html",
	directives: [ROUTER_DIRECTIVES]
})
export class ItemMainComponent implements OnInit {
	currentPage: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _sharedService: SharedService) {
		router.events.subscribe(val => {
			this.currentPage = val.url;
		});
  }

	ngOnInit() {
	}
}
