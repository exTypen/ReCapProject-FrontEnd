import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = environment.baseUrl + "/api/colors/"
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "getall");
  }

  add(color: Color): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", color)
  }

  update(color: Color): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", color)
  }

  delete(color: Color): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "delete", color)
  }

  getById(id: number): Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl + "getbyid?id=" + id)
  }
}
