import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetail[] = [];
  imageBasePath = environment.baseUrl;
  defaultImg = '/uploads/default.jpg';
  filterText = ""
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["brandId"] == 0 && params ["colorId"] == 0){
        this.getCarDetails();
      }
        else if ((params['brandId'] && params['colorId']) && (params['brandId'] != 0 && params['colorId'] != 0)) {
          this.getCarDetailsFiltered(params['brandId'], params['colorId']);
        } else if (params['brandId'] && params['brandId']!=0) {
          this.getCarsByBrandId(params['brandId']);
        } else if (params['colorId'] && params['colorId'] !=0) {
          this.getCarsByColorId(params['colorId']);
        } else {
          this.getCarDetails();

        }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }


  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
    this.carDetails = response.data
    });
  }

  getCarDetailsFiltered(brandid: number, colorid: number) {
    this.carService.getCarDetailsFiltered(brandid, colorid).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarsByBrandId(brandId: number) {

      this.carService.getCarsByBrandId(brandId).subscribe((response) => {
        this.carDetails = response.data;
      });
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  route(carId: number){
     this.router.navigate(["/car/page/",carId])
  }

  colSmGenerator(carDetails: CarDetail[]){
    if(carDetails.length==2){
      return "col-sm-6"
    } else{
      return "col-sm-4"
    }
  }
}
