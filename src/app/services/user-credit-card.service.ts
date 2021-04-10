import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserCreditCard } from '../models/userCreditCard';

@Injectable({
  providedIn: 'root'
})
export class UserCreditCardService {

  apiUrl = environment.baseUrl + "/api/usercreditcards/"
  constructor(private httpClient:HttpClient) { }

  getCardIdsByUserId(id:number):Observable<ListResponseModel<UserCreditCard>>{
    let newPath = this.apiUrl + "getcardidsbyuserid?id=" + id
    return this.httpClient.get<ListResponseModel<UserCreditCard>>(newPath)
  }

  add(userCreditCard: UserCreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', userCreditCard);
  }
}
