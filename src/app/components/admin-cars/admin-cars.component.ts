import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/cardetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {

  carDetails: CarDetail[]
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCarDetails()
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }
}
