import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/cardetail';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail-page',
  templateUrl: './car-detail-page.component.html',
  styleUrls: ['./car-detail-page.component.css']
})
export class CarDetailPageComponent implements OnInit {
  isCarRentable: Boolean
  rentals: Rental[]
  detailForm: FormGroup
  carDetails: CarDetail[]
  images: string[]
  imageBasePath = environment.baseUrl;
  defaultImg = '/uploads/default.jpg';
  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
        
        this.detailForm = this.formBuilder.group({
          carId: 2007,
          userId: 2,
          rentDate: ['', Validators.required],
          returnDate: ['', Validators.required],
        });
      
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
      this.rentals = response.data[0].rentals
    });
  }

  // routePayment(){
  //   this.router.navigate(["/car/payment/" + this.carDetails[0].carId])
  // }

  routePayment(){
      this.router.navigate(["/car/payment/" + this.carDetails[0].carId])
}

  checkIsCarRentable(){
    if (this.detailForm.valid){
      let rentalModel: Rental = Object.assign({carId:this.carDetails[0].carId, userId:2}, this.detailForm.value);
        this.rentalService.checkIsCarRentable(rentalModel).subscribe((response)=>{
          console.log(response.success)
          this.isCarRentable =response.success
          if (response.success) {
            this.routePayment()
          }else if(!response.success){
            console.log("hatasdaqds")
            this.toastrService.error("Araba kirada","Hata")
          }
        },(responseError) =>{
          console.log(responseError)
          this.toastrService.error(responseError.error.message);
        })}
        else{
          this.toastrService.error("Tüm alanları doldurun", "Hata")
        }
  }  
}
