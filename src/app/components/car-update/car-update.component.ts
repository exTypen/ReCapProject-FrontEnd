import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/cardetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  brands: Brand[]
  brandId: number = 0
  colors: Color[]
  colorId: number = 0
  carUpdateForm: FormGroup;
  carDetails:CarDetail
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
        this.createCarUpdateForm();
        this.getBrands()
        this.getColors()
      }
    })
    
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data[0];
      console.log(this.carDetails)
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      BrandId: ["", Validators.required],
      ColorId: ["", Validators.required],
      ModelYear: ["",Validators.required],
      DailyPrice: ["", Validators.required],
      Description: ["", Validators.required],
    });
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

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({carId:this.carDetails.carId}, this.carUpdateForm.value);
      console.log(carModel)
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

}
