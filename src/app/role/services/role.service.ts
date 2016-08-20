import {Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../../common/headers';
import { RestReponse } from '../../common/rest.response';
import { Role } from '../models/role';
import { SharedService } from '../../common/services/shared.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService {
  public itemsPerPage:number;

  constructor(public authHttp:AuthHttp, private  _sharedService: SharedService) {
    this.itemsPerPage = _sharedService.itemsPerPage;
  }

  public detail(roleId: number): Observable<RestReponse> {
    return this.authHttp.get(this._sharedService.apiUrl + 'role/detail/' + roleId)
      .map((response: Response) => <RestReponse>response.json());
  }

  public load(): Observable<RestReponse> {
    return this.authHttp.get(this._sharedService.apiUrl + 'role/load')
      .map((response: Response) => <RestReponse>response.json());
  }

  public list(page: number): Observable<RestReponse> {
    return this.authHttp.get(this._sharedService.apiUrl + 'role/list/' + this.itemsPerPage + '/' + page)
      .map((response: Response) => <RestReponse>response.json());
  }

  public delete(roleId: number): Observable<RestReponse> {
    return this.authHttp.delete(this._sharedService.apiUrl + 'role/delete/' + roleId)
      .map((data: Response) => <RestReponse> data.json());
  }

  public save(role: Role): Observable<RestReponse> {
    return this.authHttp.post(this._sharedService.apiUrl + 'role/create', JSON.stringify(role), {headers: contentHeaders})
      .map((response: Response) => <RestReponse>response.json());
  }

  public update(role: Role): Observable<RestReponse> {
    return this.authHttp.put(this._sharedService.apiUrl + 'role/update', JSON.stringify(role), {headers: contentHeaders})
      .map((response: Response) => <RestReponse>response.json());
  }
}
