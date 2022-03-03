import { Component, OnInit } from '@angular/core';
import { ResetPassword } from 'src/app/Shared/Models/ResetPassword';
import {UserService} from 'src/app/Shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private token:string;
  private email:string;
  error:string;
  constructor(private userService:UserService,private route:ActivatedRoute,
    private router:Router) { }
  resetPasswordModel:ResetPassword;
  ngOnInit(): void {
    this.resetPasswordModel={
      Password:'',
      ConfirmPassword:'',
      Token:'',
      Email:''
    }
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
    this.resetPasswordModel.Email=this.email;
    this.resetPasswordModel.Token=this.token;
    console.log("email1",this.email);
    console.log("email2",this.resetPasswordModel.Email);
  }
  reset()
  {
    this.userService.resetPassword(this.resetPasswordModel).subscribe(data=>{console.log("reset",data)
    if(data!=null)
    {
      this.router.navigate(['/login']);
    }
     else
     {
      this.router.navigate(['/resetPassword']);
      this.error="failed to change password, please try again";
     }
    });
  }
}
