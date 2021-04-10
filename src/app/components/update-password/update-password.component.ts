import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Password } from 'src/app/models/password';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/userdetail';
import { verifyPassword } from 'src/app/models/verifyPassword';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  verify:boolean
  userDetail:UserDetail
  userId: number
  password: Password
  passwordUpdateForm: FormGroup
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService:ToastrService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.getUserId()
    this.getUserDetailsByUserId(this.userId)
    this.createPasswordUpdateForm();
  }

  createPasswordUpdateForm() {
    this.passwordUpdateForm = this.formBuilder.group({   
      //OldPassword: ["", Validators.required],
      NewPassword: ["", Validators.required],
      NewPasswordAgain: ["", Validators.required],
    });
  }

  getUserId(){
    this.userId = this.authService.getCurrentUserId()
  }

  getUserDetailsByUserId(id: number) {
    this.userService.getUserDetailsById(id).subscribe(response=>{
      this.userDetail = response.data[0]
    }) 
  }

  async createPasswordHash(password: string){
    this.password = (await this.authService.createPasswordHash(password).toPromise()).data  
  }

  async verifyPassword(verifyPassword: verifyPassword){
    this.verify = (await this.authService.verifyPassword(verifyPassword).toPromise())
  }

  async update(){
  if(this.passwordUpdateForm.valid){
    // let verifyModel:verifyPassword = Object.assign({password: this.passwordUpdateForm.value.OldPassword,
    // passwordHash: this.userDetail.passwordHash, passwordSalt:this.userDetail.passwordSalt})
    // await this.verifyPassword(verifyModel)

    if(this.passwordUpdateForm.value.NewPassword === this.passwordUpdateForm.value.NewPasswordAgain){
      await this.createPasswordHash(this.passwordUpdateForm.value.NewPassword)
      let userModel: User = Object.assign({id:this.userDetail.userId, firstName: this.userDetail.firstName, lastName: this.userDetail.lastName, email:this.userDetail.email,
      passwordHash: this.password.passwordHash, passwordSalt: this.password.passwordSalt, findexPoint:this.userDetail.findexPoint, status:true})
      this.userService.update(userModel).subscribe(response=>{
        this.toasterService.success(response.message, "Başarılı")
      },errorResponse => {
        this.toasterService.error(errorResponse.error, "Hata")
      })
      }else{
        this.toasterService.error("Yeni şifreler uyuşmuyor", "Hata")
      }
    }else{
      this.toasterService.error("Tüm alanları doldurun", "Hata")
    }
  }
}


