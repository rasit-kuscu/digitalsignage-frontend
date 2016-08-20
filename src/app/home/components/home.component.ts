import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES, ActivatedRoute } from "@angular/router";
import { JwtHelper } from 'angular2-jwt';

@Component({
	selector: "home",
	templateUrl: "./app/home/components/home.html"
})
export class HomeComponent {
	jwtHelper:JwtHelper = new JwtHelper();
	jwt:string;
  decodedJwt:string;
	id: any;
  paramsSub: any;

	constructor(private activatedRoute: ActivatedRoute) {
		this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwtHelper.decodeToken(this.jwt);
	}

	ngOnInit() {
		console.log("Home component initialized ...");
	}
}
