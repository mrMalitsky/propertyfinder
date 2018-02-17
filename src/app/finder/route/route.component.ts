import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-route',
  template: `
  <div>
    <span class="from">{{item.departure}}</span>
    <span class="arrow fa fa-chevron-right"></span>
    <span class="to">{{item.arrival}}</span>
  </div>
  <div>
    <span class="transport">{{item.transport}}</span>
    <span class="nomer">{{item.reference}}</span>
    <span class="duration">{{item.duration.t}}h{{item.duration.m}}</span>
  </div>
  <div>
    <span class="cost">{{item.cost}}  {{currency}}</span>
  </div>
  `,
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  @Input() item: Array<string> = [];
  @Input() currency: string;

  constructor() { }

  ngOnInit() {
  }

}
