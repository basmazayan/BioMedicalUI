import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Organization } from 'src/app/Shared/Models/Organization';
import { Paging } from 'src/app/Shared/Models/Paging';
import { SubOrganization } from 'src/app/Shared/Models/subOrganization';
import { OrganizationService } from 'src/app/Shared/services/organization.service';
import { SubSubOrganizationService } from 'src/app/Shared/services/sub-organization.service';

@Component({
  selector: 'app-sub-organization-list',
  templateUrl: './sub-organization-list.component.html',
  styleUrls: ['./sub-organization-list.component.scss']
})
export class SubOrganizationListComponent implements OnInit {
  error: string
  selectedSubOrganizations: SubOrganization[]
  subOrganizationDialog: boolean;
  subOrganization: SubOrganization
  submitted: boolean;
  SubOrganizationsList: SubOrganization[];
  organizationsList: Organization[];
  msgs: Message[] = [];
  errorDialog: boolean;
  page: Paging;
  count: number;
  constructor(private suborganizationservice: SubSubOrganizationService,
    private organizatioService: OrganizationService, private router: Router,
    private translate: TranslateService, private confirmationService: ConfirmationService,
    private messageservice: MessageService) { }
  ngOnInit() {
    // this.getAll()
    this.page = {
      pagenumber: 1,
      pagesize: 10
    }
    this.suborganizationservice.getSubOrgscount().subscribe(data => {
      this.count = data
    })
    this.suborganizationservice.getAllSubOrgswithpaging(this.page).subscribe(data => {
      this.SubOrganizationsList = data;
    })
  }
  getAll() {
    this.suborganizationservice.getAllSubOrganization().subscribe(data => { this.SubOrganizationsList = data, console.log(this.SubOrganizationsList) });
  }
  openNew(subOrg) {
    console.log("sub", subOrg)
    this.subOrganizationDialog = true
    this.submitted = false;
    this.subOrganization = subOrg
    this.organizatioService.getAllOrganization().subscribe(data => { this.organizationsList = data, console.log(this.organizationsList) });
  }
  hideDialog() {
    this.subOrganizationDialog = false;
    this.submitted = false;

  }
  updatesubIOrg() {
    this.submitted = true;
    console.log("subCategoryIs", this.subOrganization)
    this.suborganizationservice.updateSubOrganization(this.subOrganization.id, this.subOrganization).subscribe(data => {
      console.log(data), this.hideDialog()

    }, error => {
      this.errorDialog = true;
      if (this.translate.currentLang == 'En') {
        if (error.error.status == 'name') {
          this.error = error.error.message;
        }
        if (error.error.status == 'nameAr') {
          this.error = error.error.message;
        }
      } if (this.translate.currentLang == 'Ar') {
        if (error.error.status == 'name') {
          this.error = error.error.messageAr;
        }
        if (error.error.status == 'nameAr') {
          this.error = error.error.messageAr;
        }
      }
      return false;
      this.getAll()
    })

  }
  deleteSubOrg(subOrg) {
    //  var result = confirm("Want to delete this subCat" + "?");
    //  if (result) {
    console.log("subCat");
    this.suborganizationservice.deleteSubOrganization(subOrg).subscribe(
      data => { console.log(data), this.getAll() }
    );
    //  }
    //  this.router.navigate(['/home/equipmentSubCategories/'])
  }
  confirmDelete(subId, subName) {
    if (this.translate.currentLang == 'En') {
      this.confirmationService.confirm({
        message: 'Do you want to delete this ' + subName + ' subOrg?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.deleteSubOrg(subId)
          this.messageservice.add({ severity: 'info', detail: 'Record deleted' });

        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'Delete rejected' });
        }
      });
    }
    else if (this.translate.currentLang == 'Ar') {
      this.confirmationService.confirm({
        message: 'هل انت متأكد من مسح' + subName + 'من القائمه ',
        header: 'تاكيد عملية المسح',
        icon: 'pi pi-info-circle',

        accept: () => {
          this.deleteSubOrg(subId)
          this.messageservice.add({ severity: 'info', detail: 'تم المسح' });
        },
        reject: () => {
          this.messageservice.add({ severity: 'info', detail: 'رفض عمليه المسح' });
        },
        acceptLabel: "نعم",
        rejectLabel: "لا",
      });
    }
  }
}

