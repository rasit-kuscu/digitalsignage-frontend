import {Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../../common/headers';
import { RestReponse } from '../../common/rest.response';
import { SharedService } from '../../common/services/shared.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Node } from '../models/node';
import { NodeConst } from '../models/node.const';

@Injectable()
export class NodeService {
    public itemsPerPage: number;

    constructor(public authHttp: AuthHttp, private _sharedService: SharedService) {
        this.itemsPerPage = _sharedService.itemsPerPage;
    }

    public loadTree(type: string): Observable<RestReponse> {
        return this.authHttp.get(this._sharedService.apiUrl + 'node/load-tree/' + type)
            .map((response: Response) => <RestReponse>response.json());
    }

    public load(nodeId: number, type: string): Observable<RestReponse> {
        return this.authHttp.get(this._sharedService.apiUrl + 'node/load/' + nodeId + '/' + type)
            .map((response: Response) => <RestReponse>response.json());
    }

    public save(node: NodeConst): Observable<RestReponse> {
        return this.authHttp.post(this._sharedService.apiUrl + 'node/create', JSON.stringify(node), { headers: contentHeaders })
            .map((response: Response) => <RestReponse>response.json());
    }

    public move(node: NodeConst): Observable<RestReponse> {
        return this.authHttp.post(this._sharedService.apiUrl + 'node/move', JSON.stringify(node), { headers: contentHeaders })
            .map((response: Response) => <RestReponse>response.json());
    }

    public update(node: NodeConst): Observable<RestReponse> {
        return this.authHttp.post(this._sharedService.apiUrl + 'node/update', JSON.stringify(node), { headers: contentHeaders })
            .map((response: Response) => <RestReponse>response.json());
    }

    public delete(nodeId: number): Observable<RestReponse> {
        return this.authHttp.delete(this._sharedService.apiUrl + 'node/delete/' + nodeId)
            .map((data: Response) => <RestReponse>data.json());
    }

    public itemSave(item: any): Observable<RestReponse> {
        return this.authHttp.post(this._sharedService.apiUrl + 'item/create', JSON.stringify(item), { headers: contentHeaders })
            .map((response: Response) => <RestReponse>response.json());
    }

    public itemRename(item: any): Observable<RestReponse> {
        return this.authHttp.post(this._sharedService.apiUrl + 'item/rename', JSON.stringify(item), { headers: contentHeaders })
            .map((response: Response) => <RestReponse>response.json());
    }

    public itemMove(item: any): Observable<RestReponse> {
        return this.authHttp.post(this._sharedService.apiUrl + 'item/move', JSON.stringify(item), { headers: contentHeaders })
            .map((response: Response) => <RestReponse>response.json());
    }

    public itemDelete(itemId: number): Observable<RestReponse> {
        return this.authHttp.delete(this._sharedService.apiUrl + 'item/delete/' + itemId)
            .map((data: Response) => <RestReponse>data.json());
    }

    public itemView(itemId: number): Observable<RestReponse> {
        return this.authHttp.get(this._sharedService.apiUrl + 'item/view/' + itemId)
            .map((data: Response) => <RestReponse>data.json());
    }
}
