import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";


import { AppComponent } from './app.component';
import { FinderComponent } from './finder/finder.component';
import { PriorityService } from './shared/services/priority/priority.service';
import { CommonService } from './shared/services/common.service';

@NgModule({
  declarations: [
    AppComponent,
    FinderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [CommonService, PriorityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
