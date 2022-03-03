import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {
  private myData: BehaviorSubject<string> = new BehaviorSubject<string>("En");
  private _storage: Storage | null = null;
  constructor(private storage: Storage) { }

  
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async load() {
    await this.init();
    const data = await this._storage.get('myData');
    this.myData.next(data);
  }

  getData(): Observable<string> {
    return this.myData;
  }
  
  updateData(data): void {
    this.myData.next(data);
  }
}
