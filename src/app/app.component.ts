import { Component } from '@angular/core';
import { EquipmentService } from "../app/Shared/services/equipment.service";
import { TranslateService ,LangChangeEvent  } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  direction: string = 'ltr';
  selectedLang:string;
  constructor(private translate:TranslateService,private route: Router){
    
    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      if(event.lang == 'Ar')
      {
        this.direction = 'rtl';
        this.selectedLang='Ar';      
      } 
      else       
      {
        this.direction = 'ltr';
        this.selectedLang='En';  
      }
    });
  }
  
  title = 'bioMedical';
}
