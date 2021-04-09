import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/cardetail';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditcardService } from 'src/app/services/creditcard.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
 
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rememberCreditCardCheck: boolean 
  checked: boolean
  cardModel: CreditCard
  diffDays:any
  price: number;
  carDetails : CarDetail
  rental:Rental
  paymentForm: FormGroup
  constructor(private formBuilder:FormBuilder,
    private creditCardService: CreditcardService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private dataTransferService: DataTransferService,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.createPaymentForm()
    this.rental = this.dataTransferService.getRental()
    this.getCarDetailsByCarId(this.rental.carId)
    

  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      CardNumber: ['', Validators.required],
      CardName: ['', Validators.required],
      CardMonth: ['', Validators.required],
      CardYear: ['', Validators.required],
      CardCcv: ['', Validators.required],
    });
  }

  async getCarDetailsByCarId(carId: number) {
    this.carDetails = (await this.carService.getCarDetailsByCarId(carId).toPromise()).data[0]
    this.paymentCalculator();
  }


  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      this.diffDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.price = this.diffDays * this.carDetails.dailyPrice;
    }
  }


  payment(){
    
    if(this.rememberCreditCardCheck){
      console.log("asdasd")
    }
    if(this.paymentForm.valid){
    let cardModel:CreditCard = Object.assign({}, this.paymentForm.value)
    console.log(cardModel)
    this.creditCardService.checkCreditCard(cardModel).subscribe((response)=>{
      if(response.success){
        
        this.rentalService.add(this.rental).subscribe(response=>{
          this.toastrService.success(response.message, "Başarılı")
        }, errorResponse => {
          console.log(errorResponse)
          this.toastrService.error(errorResponse.error, "Hata")
        })
        
      }
    },(errorResponse)=>{
      this.toastrService.error(errorResponse.error, "Hata")
    })
   }else{
     this.toastrService.error("Tüm alanları doldurun.")
   }
  }
}
