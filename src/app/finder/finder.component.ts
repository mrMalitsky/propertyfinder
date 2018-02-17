import { Component, OnInit } from '@angular/core';
import { PriorityService } from '../shared/services/priority/priority.service';
import { CommonService } from '../shared/services/common.service';
import { IData } from '../shared/interfaces/IData';
import { FilterTypes } from '../shared/app.constants';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.css']
})
export class FinderComponent implements OnInit {

  public  data: IData;
  public currency: string;
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

        this._priorityService.prepareData(this.data.deals, FilterTypes.duration);

        this._priorityService.shortestPath('Athens', 'Moscow', FilterTypes.duration).map((path) => {
          console.log(this.data.deals[path.id])
        })
      });

  }


}
