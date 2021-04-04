import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private jwtHelperService: JwtHelperService = new JwtHelperService(),
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

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          console.log(response);
          this.localStorageService.set("token", response.data.token)
          console.log(this.jwtHelperService.decodeToken(response.data.token))
          this.localStorageService.set('email', this.loginForm.value.email)
        },
        (responseError) => {
          this.toastrService.error(responseError);
        }
      );
    }
  }
}
