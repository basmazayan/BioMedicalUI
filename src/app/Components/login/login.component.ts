import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/Shared/Models/User';
import { UserService } from 'src/app/Shared/services/user.service';
import { CaptchaModule } from 'primeng/captcha';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userObj: User
  user: User;
  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }
  error: string;
  ngOnInit() {
    this.user = {
      id: '',
      userName: '',
      userNameAr: '',
      email: '',
      password: '',
      roleName: '',
      healthdirId: 0,
      suborganizationId: 0, token: '',
      healthDistrictId: 0,
      healthCareUnitId: 0,
      organizationId: 0,
      organizationName:'',
       supplierId:0
    }
    this.userObj = {
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
      organizationName:''
    }
  }
  showResponse(event) {
    this.messageService.add({ severity: 'info', summary: 'Succees', detail: 'User Responded', sticky: true });
  }
  login() {
    this.userService.login(this.user).subscribe(
      data => {
        this.userObj = data
        console.log(data)
        this.router.navigate(['/home/dashboard'])
        // localStorage.setItem('UserLogged',this.userObj.roleName)
      }
      , error => {
        this.error = error.error.message;
      })

  }

}
