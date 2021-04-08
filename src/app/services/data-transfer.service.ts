import { Injectable } from '@angular/core';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  rental:Rental
  constructor() { }

   
  setRental(data:Rental){
    this.rental = data
  }
  getRental(){
    return this.rental
  }
}
