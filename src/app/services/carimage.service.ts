import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CarImage } from '../models/carimage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {

  apiUrl= environment.baseUrl + "/api/carimages/"
  constructor(private httpClient:HttpClient) { }

  getImages(carid:number): Observable<ListResponseModel<CarImage>>{
      return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl+"getimagesbycarid?carid="+carid);
  }
}
