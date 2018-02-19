import {Component, OnInit, ViewChild} from '@angular/core';
import { PriorityService } from '../shared/services/priority/priority.service';
import { CommonService } from '../shared/services/common.service';
import { IData } from '../shared/interfaces/IData';
import { FilterTypes } from '../shared/app.constants';
import {SearchFormComponent} from './search-form/search-form.component';
declare var require: any;
const moment = require('moment');
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

    // Get data from store(json file)
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

  /**
   * Handle searching results
   * @param e
   */
  onSearch(e): void {
    this.result = this._priorityService.shortestPath(e.from, e.to).map((path) =>  this.data.deals[path.id]);
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

  /**
   * Reset all form configuration
   */
  reset(): void {
    this.result = null;
    this.searchFormComponent.countryForm = null;
    this.searchFormComponent.countryTo = null;
    this.searchFormComponent.selectedType = FilterTypes.cost;
  }
}
