import {Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../../common/headers';
import { RestReponse } from '../../common/rest.response';
import { SharedService } from '../../common/services/shared.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PrivilegeService {
  constructor(public authHttp:AuthHttp, private  _sharedService: SharedService) {
  }

  public load(): Observable<RestReponse> {
    return this.authHttp.get(this._sharedService.apiUrl + 'privilege/load')
      .map((response: Response) => <RestReponse>response.json());
  }
}
