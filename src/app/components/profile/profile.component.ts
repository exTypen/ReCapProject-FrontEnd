import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetail } from 'src/app/models/userdetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: number
  userDetail: UserDetail
  constructor(private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getUserId()
    this.getUserDetailsById(this.userId)
  }

  getUserId(){
    this.userId = this.authService.getCurrentUserId()
  }

  getUserDetailsById(id:number){
     this.userService.getUserDetailsById(id).subscribe(response=>{
       this.userDetail = response.data[0]
       console.log(this.userDetail)
     })
  }
}
