import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Login } from '../models/login';
import { contentHeaders } from '../../common/headers';
import { SharedService } from '../../common/services/shared.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  constructor(public http:Http, private  _sharedService: SharedService) {
  }

  public login(login:Login): Observable<Login> {
    return this.http.post(this._sharedService.apiUrl + 'auth/client', JSON.stringify(login), {headers: contentHeaders})
      .map((response: Response) => <Login>response.json());
  }
}
