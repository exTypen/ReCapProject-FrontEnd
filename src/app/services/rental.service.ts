import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = environment.baseUrl + "/api/rentals/"
  constructor( private httpClient:HttpClient) { }

  add(rental: Rental) :Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', rental);
  }

  getByCarId(carId: number) :Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl + 'getbycarid'+carId);
  }

  checkIsCarRentable(rental: Rental) :Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "carrentedcheck", rental)
  }

  getRentalDetails():Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getall")
  }
}
