import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule}    from '@angular/forms'
import {HttpModule} from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { FinderComponent } from './finder/finder.component';
import { PriorityService } from './shared/services/priority/priority.service';
import { CommonService } from './shared/services/common.service';
import { SearchFormComponent } from './finder/search-form/search-form.component';
import { SearchService } from './finder/search-form/service/search.service';
import { SelectButtonModule, AutoCompleteModule, ButtonModule } from 'primeng/primeng';
import { RouteComponent } from './finder/route/route.component';

@NgModule({
  declarations: [
    AppComponent,
    FinderComponent,
    SearchFormComponent,
    RouteComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    ButtonModule,
    SelectButtonModule
  ],
  providers: [CommonService, PriorityService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
