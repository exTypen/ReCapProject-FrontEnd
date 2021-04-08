import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { CreditcardService } from 'src/app/services/creditcard.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rental:Rental
  paymentForm: FormGroup
  constructor(private formBuilder:FormBuilder,
    private creditCardService: CreditcardService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private dataTransferService: DataTransferService,
  ) { }

  ngOnInit(): void {
    this.createPaymentForm()
    this.rental = this.dataTransferService.getRental()
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



  payment(){
  
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
