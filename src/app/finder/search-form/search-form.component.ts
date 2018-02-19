import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from './service/search.service';
import {SelectItem} from 'primeng/api';
import { FilterTypes } from '../../shared/app.constants';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: [
    '../../../../node_modules/primeng/resources/components/autocomplete/autocomplete.css',
    '../../../../node_modules/primeng/resources/components/selectbutton/selectbutton.css',
    '../../../../node_modules/primeng/resources/components/button/button.css',

    './search-form.component.scss'
  ]
})

export class SearchFormComponent {

  @Input() countries: Array<string> = [];
  @Output() search = new EventEmitter();

  public countryForm: string;
  public countryTo: string;
  public types: SelectItem[];
  public selectedType: number;
  public filteredCountries: Array<string>;

  constructor(private _searchService: SearchService) {
    // Set default search property
    this.selectedType = FilterTypes.cost;
    this.types = [
      {label: 'Cheapest', value: FilterTypes.cost},
      {label: 'Fastest', value: FilterTypes.duration},
    ];
   }

  /**
   * Search the countries on request
   * @param event
   */
  filterCountry(event): void {
    const query = event.query;
    this.filteredCountries = this._searchService.filterCountry(query, this.countries);
 }

  /**
   * Data transfer to the parent component
   */
  onSearch(): void {
    this.search.emit({from: this.countryForm, to: this.countryTo, type: this.selectedType});
  }
}
