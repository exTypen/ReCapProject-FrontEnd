import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/cardetail';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {

  carDetails: CarDetail[]
  constructor(private carService:CarService,
    private toastrService:ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCarDetails()
  }

  delete(carDetail:CarDetail){

    this.carService.delete(carDetail).subscribe((response)=>{
      if(response.success){
        this.toastrService.success(response.message)
        window.location.reload()
      }else{
        this.toastrService.error("Araba Eklenmedi")
      }
    })
    console.log("burdayım")
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }
}
