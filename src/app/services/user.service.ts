import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { UserDetail } from '../models/userdetail';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44332/api/users/"

  constructor(private httpClient: HttpClient,
    private localStorageService:LocalStorageService) { }

  getUserDetailsByEmail(email: string): Observable<ListResponseModel<UserDetail>>{
    let newPath = this.apiUrl + 'getuserdetailsbyemail?email=' + email;
    return this.httpClient.get<ListResponseModel<UserDetail>>(newPath);
  }

}

  