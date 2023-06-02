import { Component } from '@angular/core';
import{ToastrService} from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service:AuthService, private router:Router){
 sessionStorage.clear();
  }

userdata:any;

loginform=this.builder.group({
  username:this.builder.control('',Validators.required),
  password:this.builder.control('',Validators.required)
})

proceedlogin(){
  if(this.loginform.valid){
  this.service.Getbycode(this.loginform.value.username).subscribe(res=>{
    this.userdata=res;
    console.log(this.userdata);
    if(this.userdata.password===this.loginform.value.password){
      if(this.userdata.isactive){
        sessionStorage.setItem('username',this.userdata.username);
        sessionStorage.setItem('userrole',this.userdata.role);
        this.router.navigate(['']);

      }
      else{
        this.toastr.error('please contract admin','In active user');

      }
    }
    else{
      this.toastr.error('Invalid credentials');
    }
  });
}
}
}
