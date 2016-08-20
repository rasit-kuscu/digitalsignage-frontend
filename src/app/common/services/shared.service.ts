import {Injectable} from '@angular/core';
import { Router } from "@angular/router";
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class SharedService {
  public apiUrl: string = 'http://localhost:8080/api/';
  public itemsPerPage: number = 10;
  jwtHelper:JwtHelper = new JwtHelper();

  checkAuthority(authority: string) {
    let token = localStorage.getItem('id_token');
    if (token != null) {
      let authorities = this.jwtHelper.decodeToken(token).authorities;

      if (authorities.indexOf(authority) !== -1) {
        return true;
      }
    }
    return false;
  }
}
