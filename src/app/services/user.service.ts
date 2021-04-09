import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';
import { UserDetail } from '../models/userdetail';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl= environment.baseUrl + "/api/users/"

  constructor(private httpClient: HttpClient) { }

  getUserDetailsByEmail(email: string): Observable<ListResponseModel<UserDetail>>{
    let newPath = this.apiUrl + 'getuserdetailsbyemail?email=' + email;
    return this.httpClient.get<ListResponseModel<UserDetail>>(newPath);
  }

  getUserDetailsById(id: number): Observable<ListResponseModel<UserDetail>>{
    let newPath = this.apiUrl + 'getuserdetailsbyid?id=' + id;
    return this.httpClient.get<ListResponseModel<UserDetail>>(newPath);
  }

  update(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'update', user);
  }
}

  