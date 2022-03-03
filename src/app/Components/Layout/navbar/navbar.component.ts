import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/Shared/Models/User';
import { UserService } from 'src/app/Shared/services/user.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ContractService } from 'src/app/Shared/services/contract.service';
import { ContractVM, OrganizationRequests } from 'src/app/Shared/Models/ContractRequest';
import { EquipmentService } from 'src/app/Shared/services/equipment.service';
import { Equipment, EquipmentVM } from 'src/app/Shared/Models/Equipment';
import { BehaviorSubject } from 'rxjs';
import { BehaviorSubjectService } from 'src/app/Shared/services/behavior-subject.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() lng =new EventEmitter<string>(); ;
  currentUser: User;
  Lang: any;
  href: any;
  direction: string = 'ltr';
  visibleSidebar1;
  ll: string;
  hospitalList: ContractVM[];
  organizationRequestList: OrganizationRequests[];
  nullablMSG: string;
  length: number;
  orgId: number;
  orgRequestList: OrganizationRequests[] = [];
  EquipmentList: Equipment[];

  constructor(private userService: UserService, public translate: TranslateService,
    private router: Router, private element: ElementRef, private primengConfig: PrimeNGConfig,
    private contractRequestService: ContractService,private behaviorSubject:BehaviorSubjectService,
    private equipmentService: EquipmentService, private route: Router) {
    this.currentUser = this.userService.currentUserValue;
    translate.addLangs(['En', 'Ar']);
    localStorage.setItem("lang", "En");
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/En|Ar/) ? browserLang : 'En');
    translate.setDefaultLang('En');
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    if (this.currentUser.roleName == "Organization") {
      this.getAllRequestsForOrg();
    }
    this.orgId = this.currentUser.organizationId;
    if (this.currentUser.roleName == "Admin") {
      this.getRequestForUPA();

    }
    if (this.currentUser.roleName == "Hospital") {
      this.getAllEquipment(this.currentUser.healthCareUnitId);
    }


  }
  logout() {
    this.userService.logout()
  }
  switchLang(lang: string) {

    localStorage.setItem('lang', lang)
    this.Lang = lang;
    this.href = this.router.url;
    this.translate.use(lang);
    this.lng.emit(lang);
    this.behaviorSubject.updateData(lang);
    // let currentUrl = this.route.url;
    // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.route.onSameUrlNavigation = 'reload';
    // this.route.navigate([currentUrl]);
  }
  getAllRequestsForOrg() {
    this.length = 0;
    this.contractRequestService.getHosForOrg(this.currentUser.organizationId).subscribe(data => {
      this.hospitalList = data
      if (this.hospitalList.length > 0) {
        this.length = this.hospitalList.length
      }

    });


  }
  getRequestForUPA() {
    this.length = 0
    this.contractRequestService.getRequestForUPA().subscribe(data => {
      this.organizationRequestList = data;
      this.organizationRequestList.forEach(elem => {
        if (elem.orgRequests.length > 0) {
          this.length += elem.orgRequests.length;
        }
        else {
          this.nullablMSG = "there is no new request.";
        }
      })
      //  if (this.organizationRequestList.length == 0) {
      //    this.nullablMSG = "there is no new request.";
      //  }
    })
  }
  getAllEquipment(hosId) {
    this.length = 0;
    this.equipmentService.getEquipmentInHospital(this.currentUser.healthCareUnitId).subscribe(data => {
      this.EquipmentList = data
      if (this.EquipmentList.length > 0) {
        this.length = this.EquipmentList.length

      }
    });
  }
}
