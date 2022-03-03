import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
data:any[]
  constructor(private http: HttpClient) {}
//    getEvents() {
//     return this.http.get('showcase/resources/data/calendarevents.json')
                
//                 .subscribe(res => res=res)
//                 // .then(data => { return data; });
// }

}
