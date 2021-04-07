import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/cardetail';
import { Color } from 'src/app/models/color';
import { Rental } from 'src/app/models/rental';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  rentals: Rental[] = [];
  carDetails: CarDetail[] = [];
  brands: Brand[]
  colors: Color[]
  constructor(private carService:CarService,
    private colorService:ColorService,
    private brandService: BrandService,
    private rentalService: RentalService,
    ) { }

  ngOnInit(): void {
    this.getCarDetails()
    this.getRentalDetails()
    this.getBrands()
    this.getColors()
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getRentalDetails(){
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentals = response.data
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data
    })
  }
}
