import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GoogleDrive provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleDocsService {
  data: any = null;

  constructor(public http: Http) {}

  load( id ) {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
    var url1= 'https://docs.google.com/spreadsheets/d/1ANdQs3-3fDF-Dnr9DOsXpx-4oQaVyYV-2NgvnS2i-bQ/pubhtml'

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(url)
        .map(res => res.json() )
        .subscribe( data => {
          console.log( 'Raw Data', data );
          this.data = data.feed.entry;

          let returnArray: Array<any> = [];
          if( this.data && this.data.length > 0 ) {
            this.data.forEach( ( entry, index ) => {
              var obj = {};
              for( let x in entry ) {
                if( x.includes('gsx$') && entry[x].$t ){
                  obj[x.split('$')[1]] = entry[x]['$t'];
                  // console.log( x.split('$')[1] + ': ' + entry[x]['$t'] );
                }
              }
              returnArray.push( obj );
            });
          }
          resolve(returnArray);
        });
    });
  }

  read(id) {
    let url2= 'https://sheets.googleapis.com/v4/spreadsheets/'+id+'/values/Sheet1!A1:D5?key=AIzaSyAofGC8LP_anzd40oDzdnA5w2sLl7aF8y8';
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(url2)
        .map(res => res.json() )
        .subscribe( data => {
          console.log( 'google Sheet data:', data );
        })
    })

  }

}
