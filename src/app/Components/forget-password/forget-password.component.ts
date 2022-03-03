import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Shared/Models/User';
import { UserService } from 'src/app/Shared/services/user.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  user: User;
  userReturned: User;
  message: string;
  Color: string;
  error: string;
  ngOnInit(): void {
    this.user = {
      id: '',
      userName: '',
      userNameAr: '',
      email: '',
      password: '',
      roleName: '',
      healthdirId: 0,
      suborganizationId: 0,
      token: '',
      healthDistrictId: 0,
      healthCareUnitId: 0,
      organizationId: 0,
      organizationName:'',
      supplierId:0
    }
  }
  confirm() {
    this.userService.forgetPassword(this.user.email).subscribe(
      data => {
        this.router.navigate(['/login'])
        //  this.message="please check you mail to reset password";
      },
      error => {
        //  this.user=null;
        this.error = error.error.message;
        //this.router.navigate(['/forgetPassword']);
      }
    );
  }
}
