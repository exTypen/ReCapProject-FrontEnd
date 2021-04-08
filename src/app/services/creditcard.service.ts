import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {

  apiUrl = environment.baseUrl + "/api/creditcards/"
  constructor(private httpClient: HttpClient) { }

  checkCreditCard(creditCard: CreditCard) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "checkcreditcard", creditCard)
  }
}
