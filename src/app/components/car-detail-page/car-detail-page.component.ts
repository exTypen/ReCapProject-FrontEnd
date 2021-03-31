import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/cardetail';
import { CarImage } from 'src/app/models/carimage';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail-page',
  templateUrl: './car-detail-page.component.html',
  styleUrls: ['./car-detail-page.component.css']
})
export class CarDetailPageComponent implements OnInit {

  carDetails: CarDetail[]
  images: string[]
  imageBasePath = environment.baseUrl;
  defaultImg = '/uploads/default.jpg';
  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {

        console.log("burdayım")
        this.getCarDetailsByCarId(params['carId']);
      } 
    });
  }


  setImageClass(imagePath:string){
    if(imagePath === this.images[0]){
      return "carousel-item active"
    }else{
      return "carousel-item"
    }
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.images = response.data[0].images
      console.log(this.images);
    });
  }
}
