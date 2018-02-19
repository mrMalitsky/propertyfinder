import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {IData} from '../interfaces/IData';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CommonService {

  private _data;
  private _url = 'assets/data/response.json';

  constructor(private _http: Http) { }

  /**
   * Get information about countries
   * @returns {IData}
   */
  public getData(): Observable<IData> {
    return this._http.get(this._url)
     .map((response: Response) => response.json());
  }

}
