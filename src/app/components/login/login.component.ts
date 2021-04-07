import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  islogin:boolean
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // login() {
  //   if (this.loginForm.valid) {
  //     console.log(this.loginForm.value);
  //     let loginModel = Object.assign({}, this.loginForm.value);

  //     this.authService.login(loginModel).subscribe(
  //       (response) => {
  //         this.toastrService.info(response.message);
  //         this.localStorageService.set("token", response.data.token)
  //         this.islogin=true
  //       },
  //       (responseError) => {
  //         this.toastrService.error(responseError.error);
  //         console.log(responseError)
  //         this.islogin=false
  //       }
  //     );
  //   }
  // }


  login(){
    if(this.loginForm.valid){
      let loginModel:LoginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel)
    }else{
      this.toastrService.info("Lütfen tüm alanları doldurunuz","Bilgilendirme")
    }
  }

  routeMainPage(){
    if(this.islogin){
      this.router.navigate(["/"])
    }
    
  }
}
