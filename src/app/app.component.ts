import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, NavigationEnd, NavigationStart } from "@angular/router";
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { CollapseDirective, DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { SharedService } from './common/services/shared.service';

@Component({
    selector: "app",
    templateUrl: "./app/app.html",
    directives: [ROUTER_DIRECTIVES, CollapseDirective, DROPDOWN_DIRECTIVES],
    providers: [SharedService]
})
export class AppComponent {
    isCollapsed:boolean = true;
    jwt:string;
    isLogged:boolean = false;
    jwtHelper:JwtHelper = new JwtHelper();

    constructor(public router:Router, private authHttp: AuthHttp, private _sharedService: SharedService) {
      this.isLogged = false;
      router.events.subscribe(val => {
        if (val instanceof NavigationStart) {
          this.jwt = localStorage.getItem('id_token');
          if (this.jwt != null) {
            if (!this.jwtHelper.isTokenExpired(localStorage.getItem('id_token'))) {
              this.isLogged = true;
            } else {
              this.isLogged = false;
            }
          } else {
            this.isLogged = false;
          }
        }
        if (val instanceof NavigationEnd) {
          if (val.url.substring(0, 6) === '/error') {
            this.isLogged = false;
          }
        }

      });
    }

    logout() {
      localStorage.removeItem('id_token');
      this.router.navigate(['/login']);
    }
}
