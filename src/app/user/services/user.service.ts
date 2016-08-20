import {Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { User } from '../models/user';
import { RestReponse } from '../../common/rest.response';
import { contentHeaders } from '../../common/headers';
import { SharedService } from '../../common/services/shared.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  public itemsPerPage:number;

  constructor(public authHttp:AuthHttp, private  _sharedService: SharedService) {
    this.itemsPerPage = _sharedService.itemsPerPage;
  }

  public list(page: number): Observable<RestReponse> {
    return this.authHttp.get(this._sharedService.apiUrl + 'user/list/' + this.itemsPerPage + '/' + page)
      .map((response: Response) => <RestReponse>response.json());
  }

  public delete(userId: number): Observable<RestReponse> {
    return this.authHttp.delete(this._sharedService.apiUrl + 'user/delete/' + userId)
      .map((response: Response) => <RestReponse>response.json());
  }

  public detail(userId: number): Observable<RestReponse> {
    return this.authHttp.get(this._sharedService.apiUrl + 'user/detail/' + userId)
      .map((response: Response) => <RestReponse>response.json());
  }

  public save(user: User): Observable<RestReponse> {
    return this.authHttp.post(this._sharedService.apiUrl + 'user/create', JSON.stringify(user), {headers: contentHeaders})
      .map((response: Response) => <RestReponse>response.json());
  }

  public update(user: User): Observable<RestReponse> {
    return this.authHttp.put(this._sharedService.apiUrl + 'user/update', JSON.stringify(user), {headers: contentHeaders})
      .map((response: Response) => <RestReponse>response.json());
  }
}
