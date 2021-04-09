import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/models/userdetail';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-rentals',
  templateUrl: './profile-rentals.component.html',
  styleUrls: ['./profile-rentals.component.css']
})
export class ProfileRentalsComponent implements OnInit {

  userDetail: UserDetail
  userId: number
  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router) { 

  }

  ngOnInit(): void {
    this.getUserId()
    this.getUserDetailsById(this.userId)
  }

  getUserId(){
    this.userId = this.authService.getCurrentUserId()
  }

  routeCarPage(carId:number){
    this.router.navigate(["car/page/"+carId])
  }

  getUserDetailsById(userId:number){
    this.userService.getUserDetailsById(userId).subscribe(response=>{
      this.userDetail = response.data[0]
    })
  }
}
