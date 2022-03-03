import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Shared/Models/User';
import { UserService } from 'src/app/Shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  user: User;
  error:string;
  ngOnInit() {
    this.user = {
      id: '',
      userName: '',
      userNameAr: '',
      email: '',
      password: '',
      roleName: '',
      healthdirId: null,
      token: '',
      suborganizationId: null,
      healthDistrictId: null,
      healthCareUnitId: null,
      organizationId: null,
      organizationName:''
    }
  }
  register() {
    this.userService.register(this.user).subscribe(data => { console.log(data, this.user) }//,this.router.navigate(['/login'])}
      , error => {
        this.error = error.error.Message,
        alert(this.error + "27-7")
      })
  }
}
