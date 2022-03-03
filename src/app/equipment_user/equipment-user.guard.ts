import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {ActivatedRoute, CanActivate} from '@angular/router';

import { Observable } from 'rxjs';
import { EquipmentUserService } from './equipment-user.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentUserGuard implements CanActivate {
  constructor(private equipmentUser: EquipmentUserService,
    private route:ActivatedRoute){}
  canActivate():boolean{
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    if(!this.equipmentUser.getUser())
    {

      console.log("false")
      return false;
    }
    console.log("true")
    return true;
  }
  
}
