import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-route',
  template: `
  <div>
    <div  class="inline currency">
      <span class="cost">{{item.cost}}  {{currency}}</span>
    </div>
    <div class="inline">
      <strong class="from">{{item.departure}}</strong>
      <span class="arrow fa fa-chevron-right"></span>
      <span class="duration"> {{item.duration.h}}h {{item.duration.m}}</span>
      <span class="arrow fa fa-chevron-right"></span>
      <strong class="to">{{item.arrival}}</strong>
    </div>
    <div>
      <span class="nomer">{{item.reference}}</span>
      <span class="transport {{item.transport}}"></span>
    </div>
  <div>

  `,
  styleUrls: ['./route.component.scss']
})
export class RouteComponent{

  @Input() item: Array<string> = [];
  @Input() currency: string;

  constructor() { }
}
