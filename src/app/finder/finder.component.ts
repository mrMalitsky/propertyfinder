import { Component, OnInit, ViewChild } from '@angular/core';
import { PriorityService } from '../shared/services/priority/priority.service';
import { CommonService } from '../shared/services/common.service';
import { IData } from '../shared/interfaces/IData';
import { FilterTypes } from '../shared/app.constants';
import {SearchFormComponent} from './search-form/search-form.component'

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
  // public  data: IData = {'currency': 'EUR',
  //   deals: [
  //     {'transport': 'train', 'departure': 'London', 'arrival': 'Amsterdam', 'cost': 160, "discount": 0, "duration": {
  //         "h": "05",
  //         "m": "30"
  //       }},
  //     {'transport': 'car', 'departure': 'London', 'arrival': 'Amsterdam', 'cost': 140, "discount": 0, "duration": {
  //         "h": "05",
  //         "m": "40"
  //       }},
  //     {'transport': 'bus', 'departure': 'London', 'arrival': 'Amsterdam', 'cost': 300, "discount": 70, "duration": {
  //         "h": "05",
  //         "m": "11"
  //       }},
  //     {'transport': 'train', 'departure': 'London', 'arrival': 'Berlin', 'cost': 260, "discount": 0, "duration": {
  //         "h": "03",
  //         "m": "30"
  //       }},
  //     {'transport': 'bus', 'departure': 'Amsterdam', 'arrival': 'Vinnitsa', 'cost': 40, "discount": 0, "duration": {
  //         "h": "02",
  //         "m": "30"
  //       }},
  //     {'transport': 'car', 'departure': 'Vinnitsa', 'arrival': 'London', 'cost': 120, "discount": 0, "duration": {
  //         "h": "05",
  //         "m": "00"
  //       }}
  //   ]
  // };

  constructor(private _priorityService: PriorityService, private _commonService: CommonService) { }

  ngOnInit() {
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
  }

  reset() {
    this.result = null;
    this.searchFormComponent.countruForm = null;
    this.searchFormComponent.countruTo = null;
    this.searchFormComponent.selectedType = FilterTypes.cost;
  }




}
