import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

  private _data;
  private _url= 'assets/data/response.json';

  constructor(private _http: Http) { }

  public getData() {
    return this._http.get(this._url)
     .map((response: Response) => response.json());
  }

}
