import { Component } from '@angular/core';
import{FormBuilder, Validators} from '@angular/forms';
import{ToastrService} from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private builder:FormBuilder, private toastr: ToastrService, private service:AuthService, private router:Router){

  }
  registerform=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    password: this.builder.control('', Validators.compose([
      Validators.required,
      Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_]).{8,}$/)
    ])),
    gender:this.builder.control('female'),
    role:this.builder.control(''),
    isactive:this.builder.control(false),
  });

  proceedregistration(){
    if(this.registerform.valid){
      this.service.Proceedregister(this.registerform.value).subscribe( res=>{
        this.toastr.success('please contact admin for enable access','Register Successfully');
        this.router.navigate(['login']);
      });

    }
    else{
      this.toastr.warning('please enter valid data');

    }



  }
}
