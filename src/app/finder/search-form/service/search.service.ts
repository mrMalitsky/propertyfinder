import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor() { }

  filterCountry(query, countries: Array<string>):any[] {  
    let filtered : any[] = [];
    for(let i = 0; i < countries.length; i++) {
        let country = countries[i];
        if(country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }
    return filtered;
}

}
