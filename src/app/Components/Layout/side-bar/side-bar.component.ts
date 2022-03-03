import { Component, OnInit, ViewChild } from '@angular/core';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem,PrimeNGConfig} from 'primeng/api';
import { TranslateService ,LangChangeEvent  } from '@ngx-translate/core'; 
import { MatMenuTrigger } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from 'src/app/Shared/Models/User';
import { UserService } from 'src/app/Shared/services/user.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  // @ViewChild(MatSidenav)
  // sidenav: MatSidenav;

  @ViewChild('sidenav',{static:true}) sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showFiller = false;
  items:MenuItem[];
  visibleSidebar1=true;
  selectedLang:string;
  label1:any;
  category:any;
  currentUser: User;
  constructor(private primengConfig: PrimeNGConfig,private translate:TranslateService,
    private observer: BreakpointObserver,private userService: UserService) { 
      this.currentUser = this.userService.currentUserValue;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      if(event.lang == 'Ar')
      {
        this.selectedLang='Ar';
      } 
      else       
      {
        this.selectedLang='En';
      }
    });
  }

  ngOnInit(): void {
    // console.log("lang",this.translate.getBrowserLang()) ;
    this.observer.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe( (state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
           console.log( 'Matches XSmall viewport');
           this.sidenav.mode =  'over';
           this.sidenav.close();
      }
      if (state.breakpoints[Breakpoints.Small]) {
           console.log( 'Matches Small viewport');
           this.sidenav.mode = 'over';
           this.sidenav.close();
      }
      if (state.breakpoints[Breakpoints.Medium]) {
           console.log( 'Matches Medium  viewport');
           this.sidenav.mode = 'side';
           this.sidenav.close();
      }
      if (state.breakpoints[Breakpoints.Large]) {

          console.log( 'Matches Large viewport');
          this.sidenav.mode = 'side';
          this.sidenav.open();
      }
      if (state.breakpoints[Breakpoints.XLarge]) {

         console.log( 'Matches XLarge viewport');   
         this.sidenav.mode = 'side';
         this.sidenav.open();
      }
    });
  }
  // ngAfterViewInit() {

  //   this.observer.observe([
  //     Breakpoints.XSmall,
  //     Breakpoints.Small,
  //     Breakpoints.Medium,
  //     Breakpoints.Large,
  //     Breakpoints.XLarge
  //   ]).subscribe( (state: BreakpointState) => {
  //     if (state.breakpoints[Breakpoints.XSmall]) {
  //          console.log( 'Matches XSmall viewport');
  //          this.sidenav.mode = 'over';
  //          this.sidenav.close();
  //     }
  //     if (state.breakpoints[Breakpoints.Small]) {
  //          console.log( 'Matches Small viewport');
  //          this.sidenav.mode = 'over';
  //          this.sidenav.close();
  //     }
  //     if (state.breakpoints[Breakpoints.Medium]) {
  //          console.log( 'Matches Medium  viewport');
  //          this.sidenav.mode = 'side';
  //          this.sidenav.close();
  //     }
  //     if (state.breakpoints[Breakpoints.Large]) {

  //         console.log( 'Matches Large viewport');
  //         this.sidenav.mode = 'side';
  //         this.sidenav.open();
  //     }
  //     if (state.breakpoints[Breakpoints.XLarge]) {

  //        console.log( 'Matches XLarge viewport');   
  //        this.sidenav.mode = 'side';
  //        this.sidenav.open();
  //     }
  //   });
  // }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  gettrans()
  {
    console.log("lang",this.translate.getBrowserLang()) ;   
    this.translate.get('Sidebar').subscribe((data: string) => {
      console.log("trans",data);
      this.label1=data['Users']
      this.category=data['EquipmentCategories']
      // console.log("label1",this.label1);
      // console.log("cat",this.category);
     
    });

    this.items = [
      {
          label: 'Setting',
          items: [{
                  label:this.label1,
                  routerLink:['/home/users'],
              },
              {
                label:this.category,
                routerLink:['/home/equipmentCategories'],
              }
          ]
      }]
    }
    
}
