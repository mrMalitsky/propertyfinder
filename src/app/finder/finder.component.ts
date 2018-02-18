import { Component, OnInit, ViewChild } from '@angular/core';
import { PriorityService } from '../shared/services/priority/priority.service';
import { CommonService } from '../shared/services/common.service';
import { IData } from '../shared/interfaces/IData';
import { FilterTypes } from '../shared/app.constants';
import {SearchFormComponent} from './search-form/search-form.component'

var moment = require('moment');
moment().format();

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {

  @ViewChild(SearchFormComponent) searchFormComponent: SearchFormComponent

  public  data: IData;
  public currency: string;
  public countries: Array<string>;
  public result: any;
  public total: any;

  constructor(private _priorityService: PriorityService, private _commonService: CommonService) { }

  ngOnInit() {
    this.total = {cost: 0, time: {}};
    this._commonService.getData()
     .subscribe(resData => {
       this.data = resData;
       this.currency = resData.currency;
        // Prepare data for searching
        this._priorityService.prepareData(this.data.deals, FilterTypes.duration);
        // Get countries list
        this.countries = this._priorityService.getCountries();
      });
  }

  onSearch(e) {
    // Searching
    this.result = this._priorityService.shortestPath(e.from, e.to, e.type).map((path) =>  this.data.deals[path.id]);
    this.total.cost = 0;
    const now = moment(new Date());
    const endDate = moment(new Date());

    this.result.forEach((item) => {
      // Calculating of total cost
      this.total.cost += item.cost;
      // Calculating of totala time
      endDate.add(item.duration.h, 'h');
      endDate.add(item.duration.m, 'm');

    })

    this.total.time.h = moment.duration(endDate.diff(now)).hours();
    this.total.time.m = moment.duration(endDate.diff(now)).minutes();
  }

  reset() {
    this.result = null;
    this.searchFormComponent.countruForm = null;
    this.searchFormComponent.countruTo = null;
    this.searchFormComponent.selectedType = FilterTypes.cost;
  }
}
