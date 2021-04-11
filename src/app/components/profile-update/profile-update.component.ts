import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/userdetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  userId: number 
  userDetail : UserDetail
  userUpdateForm: FormGroup
  constructor(private formBuilder : FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUserId()
    this.getUserDetailsByUserId(this.userId)
  }

  getUserId(){
    this.userId = this.authService.getCurrentUserId()
  }

  async getUserDetailsByUserId(id: number) {
    this.userDetail = (await this.userService.getUserDetailsById(id).toPromise()).data[0]
    this.createUserUpdateForm();
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
    });
  }

  update(){
    if(this.userUpdateForm.valid){
      let userModel:User = Object.assign({passwordSalt: this.userDetail.passwordSalt, passwordHash: this.userDetail.passwordHash, id: this.userDetail.userId, findexPoint:this.userDetail.findexPoint, status:true}, this.userUpdateForm.value)
      this.userService.update(userModel).subscribe(response=>{
        if(response.success){
          this.toastrService.success(response.message, "Başarılı")
        }
      }, responseError=>{
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }
      })
    }else{
      this.toastrService.error("Tüm alanları doldurun.")
    }
  }

}
