import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carimage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {

  apiUrl="https://localhost:44332/api/carimages/"
  constructor(private httpClient:HttpClient) { }

  getImages(carid:number): Observable<ListResponseModel<CarImage>>{
      return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl+"getimagesbycarid?carid="+carid);
  }
}
