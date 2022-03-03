import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { element } from 'protractor';
import { Equipment } from '../Shared/Models/Equipment';
import { Inventory } from '../Shared/Models/Inventory';
import { User } from '../Shared/Models/User';
import { EquipmentService } from '../Shared/services/equipment.service';
import { InventoryService } from '../Shared/services/inventory.service';
import { UserService } from '../Shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentUserService {

  currentUser: User;
  users: User[];
  equipmentObj: Equipment;
  error: string
  Inventory: Inventory
  // url:string
  detailsUrl: boolean
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  constructor(private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private equipmentService: EquipmentService,
    private inventoryService: InventoryService) {
    this.currentUser = this.userService.currentUserValue;
  }

  public getUser(): boolean {
    console.log("yomnaaaaaaaaaaaaaaaaaaaaa")
    var url = window.location.href


    console.log(url)
    var id = Number(url.substring(url.lastIndexOf('/') + 1));
    console.log(id)

    this.equipmentService.getEquipmentById(id)
      .subscribe(data => {
        this.equipmentObj = data, console.log("guarddetails", this.equipmentObj)
        if (!this.currentUser) {
          console.log("noooooooooooooooooooooooooooooo")
          var frame5 = document.createElement("div");                                        // Append the text to <p>
          var h5=document.body.appendChild(frame5);
          h5.insertAdjacentHTML("afterend", '<p style="position:relative;left:500px;top:120px;color:red;">user not found</p>')
          
          this.router.navigate(['/'])
          return false
        }
        else if (!this.equipmentObj) {
          console.log("no equipment")
          this.router.navigate(['/'])
        
          return false
        }
        this.userService.getUsersByEquipmentId(id).subscribe(e => {
          this.users = e,
            console.log(this.users.length)
          if (this.users.length == 0) {
            console.log(this.users.length)

            console.log("nullllllllllllllllllllllll", "currentUser", this.currentUser.id)

            this.router.navigate(['/'])
            var frame3 = document.createElement("div");                                        // Append the text to <p>
            var h3=document.body.appendChild(frame3);
            h3.insertAdjacentHTML("afterend", '<p style="position:relative;left:500px;top:120px;color:red;">No users</p>')
            
            console.log("faaaaaaaaaalse")

            return false;
          }
          this.users.forEach(element => {
            console.log(element)
            if (element.id == this.currentUser.id) {

              console.log(this.users, "elemeeeeeeeeeent", "elemId", element.id, "currentUser", this.currentUser.id)
              // this.router.navigate(['home/EquipmentDetails'])
              id = this.equipmentObj.id
              console.log(id, url)
              this.saveInInventory()
              console.log("trueeeeeeeee")
              return true;
            }
            // this.router.navigate(['/'])

            else {
              console.log(this.users, "elemeeeeeeeeeent", "elemId", element.id, "currentUser", this.currentUser.id)

              this.router.navigate(['/'])
              var frame = document.createElement("div");
              // var para = document.createElement("P");                        // Create a <p> node
              // frame.appendChild(para);
              // var content = document.createTextNode("This is a paragraph.");    // Create a text node
              // para.appendChild(content);                                           // Append the text to <p>
              var h=document.body.appendChild(frame);
              h.insertAdjacentHTML("afterend", '<p style="position:relative;left:500px;top:120px;color:red;">Not allowed to scan this equipment</p>')
             
              console.log("faaaaaaaaaalse")
              return false;
            }
          })
        },
          error => {
            this.error = error.error.message, console.log(this.error),
              this.router.navigate(['/'])
              var frame2 = document.createElement("div");                                        // Append the text to <p>
              var h2=document.body.appendChild(frame2);
              h2.insertAdjacentHTML("afterend", '<p style="position:relative;left:500px;top:120px;color:red;">Not allowed to scan this equipment</p>')
              
          })
        // if (!this.users) {
        //   console.log("faaaaaaaaaalse")
        //   // this.router.navigate(['/'])
        //   return false
        // }
        // console.log("trueeeeeeeeee")

        // return true
      });


    return true;
  }
  saveInInventory() {
    this.Inventory = {
      id: 0,
      equipmentId: 0,
      userId: '',
      equipmentCode: '',
      userName: '',
      createdAt: new Date
    }
    console.log(this.equipmentObj.id)
    this.Inventory.equipmentId = this.equipmentObj.id
    this.Inventory.userId = this.currentUser.id
    this.Inventory.createdAt = new Date();
    console.log(this.Inventory)
    this.inventoryService.AddInInventory(this.Inventory).subscribe(data => console.log(data))
  }
  // public getUsers() {
  //   const id = 50
  //   this.equipmentService.getEquipmentById(id)
  //     .subscribe(data => { this.equipmentObj = data, console.log("guarddetails", this.equipmentObj) });
  //   this.userService.getUsersByEquipmentId(id).subscribe(e => {
  //     this.users = e,
  //       this.users.forEach(element => {
  //         if (element.id == this.currentUser.id) {
  //           // this.router.navigate(['home/EquipmentDetails'])
  //           this.router.navigate(['/home/dashboard']);
  //           console.log(element, "elemeeeeeeeeeent")
  //           return true;
  //         }
  //         this.router.navigate(['/'])
  //         return false;
  //       })
  //   })
  //   return false;
  // }
}
