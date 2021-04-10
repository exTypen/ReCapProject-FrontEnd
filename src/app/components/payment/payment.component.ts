import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/cardetail';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { UserCreditCard } from 'src/app/models/userCreditCard';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CreditcardService } from 'src/app/services/creditcard.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserCreditCardService } from 'src/app/services/user-credit-card.service';

@Component({
 
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  userId: number

  currentCard: CreditCard
  selectedCard: CreditCard
  savedCards:CreditCard[] = []
  isChecked: boolean = false;
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
    private carService: CarService,
    private authService:AuthService,
    private userCreditCardService: UserCreditCardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserId()
    this.createPaymentForm()
    this.rental = this.dataTransferService.getRental()
    this.getCarDetailsByCarId(this.rental.carId)
    this.getCreditCards()
  }

  getUserId(){
    this.userId = this.authService.getCurrentUserId()
  }

  async getCreditCards(){
  let userId = this.authService.getCurrentUserId();
  let creditCards = (await this.userCreditCardService.getCardIdsByUserId(userId).toPromise()).data
  creditCards.forEach(card => {
    this.creditCardService.getCardDetailsById(card.cardId).subscribe(response => {
      this.savedCards.push(response.data)
      
    })
  });
}

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      savedCards: [""],
      cardNumber: ['', Validators.required],
      cardName: ['', Validators.required],
      cardMonth: ['', Validators.required],
      cardYear: ['', Validators.required],
      cardCcv: ['', Validators.required],
    });
  }

  getCardDetails(card: CreditCard){
      this.paymentForm.patchValue(
        card
      )
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


  setValues(){ 
    this.paymentForm.patchValue(this.selectedCard)
  }

  async payment(){
    
    if(this.paymentForm.valid){
    let cardModel:CreditCard = Object.assign({}, this.paymentForm.value)
    this.creditCardService.checkCreditCard(cardModel).subscribe((response)=>{
      if(response.success){
        
        this.rentalService.add(this.rental).subscribe(async response=>{
          this.toastrService.success(response.message, "Başarılı")

          if(this.isChecked){
            this.currentCard = (await this.creditCardService.getCardDetailsByNumber(this.paymentForm.value.cardNumber).toPromise()).data
            let userCreditCardModel:UserCreditCard = Object.assign({userId:this.userId, cardId: this.currentCard.cardId})
            this.userCreditCardService.add(userCreditCardModel).subscribe(repsonse2=>{
              this.toastrService.success(repsonse2.message, "Başarılı")
            },errorResponse2 => {
              this.toastrService.error(errorResponse2.message, "Hata")
            })
          } this.router.navigate(["profile/rentals"])
        }, errorResponse => {
          this.toastrService.error(errorResponse.error.message, "Hata")
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
