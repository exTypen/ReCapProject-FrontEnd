import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {

  apiUrl = environment.baseUrl + "/api/creditcards/"
  constructor(private httpClient: HttpClient) { }

  checkCreditCard(creditCard: CreditCard) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "checkcreditcard", creditCard)
  }

  getCardDetailsById(id:number):Observable<SingleResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "getcardbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath)
  }

  getCardDetailsByNumber(number:number):Observable<SingleResponseModel<CreditCard>>{
    let newPath = this.apiUrl + "getcardbynumber?number=" + number
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath)
  }

}
