import {Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { MyProfile } from '../models/myprofile';
import { RestReponse } from '../../common/rest.response';
import { contentHeaders } from '../../common/headers';
import { SharedService } from '../../common/services/shared.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyProfileService {
  constructor(public authHttp:AuthHttp, private  _sharedService: SharedService) {
  }

  public load(): Observable<RestReponse> {
    return this.authHttp.get(this._sharedService.apiUrl + 'my_profile/load')
      .map((data: Response) => <RestReponse> data.json());
  }

  public save(myProfile: MyProfile): Observable<RestReponse> {
    return this.authHttp.put(this._sharedService.apiUrl + 'my_profile/update', JSON.stringify(myProfile), {headers: contentHeaders})
      .map((response: Response) => <RestReponse>response.json());
  }
}
