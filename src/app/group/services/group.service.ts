import {Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { RestReponse } from '../../common/rest.response';
import { Group } from '../models/group';
import { contentHeaders } from '../../common/headers';
import { SharedService } from '../../common/services/shared.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GroupService {
  public itemsPerPage:number;

  constructor(public authHttp:AuthHttp, private  _sharedService: SharedService) {
    this.itemsPerPage = _sharedService.itemsPerPage;
  }

  public detail(groupId: number): Observable<RestReponse> {
    return this.authHttp.get(this._sharedService.apiUrl + 'group/detail/' + groupId)
      .map((response: Response) => <RestReponse>response.json());
  }

  public load(): Observable<RestReponse> {
    return this.authHttp.get(this._sharedService.apiUrl + 'group/load')
      .map((data: Response) => <RestReponse> data.json());
  }

  public list(page: number): Observable<RestReponse> {
    return this.authHttp.get(this._sharedService.apiUrl + 'group/list/' + this.itemsPerPage + '/' + page)
      .map((response: Response) => <RestReponse>response.json());
  }

  public delete(groupId: number): Observable<RestReponse> {
    return this.authHttp.delete(this._sharedService.apiUrl + 'group/delete/' + groupId)
      .map((data: Response) => <RestReponse> data.json());
  }

  public save(group: Group): Observable<RestReponse> {
    return this.authHttp.post(this._sharedService.apiUrl + 'group/create', JSON.stringify(group), {headers: contentHeaders})
      .map((response: Response) => <RestReponse>response.json());
  }

  public update(group: Group): Observable<RestReponse> {
    return this.authHttp.put(this._sharedService.apiUrl + 'group/update', JSON.stringify(group), {headers: contentHeaders})
      .map((response: Response) => <RestReponse>response.json());
  }
}
