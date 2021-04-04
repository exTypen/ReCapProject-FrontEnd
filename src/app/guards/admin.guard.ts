import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserDetail } from '../models/userdetail';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  userDetail: UserDetail[] = [];
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.getUserDetailsByEmail();
  }

  getUserDetailsByEmail() {
    let email: string = this.localStorageService.get('email');
    this.userService.getUserDetailsByEmail(email).subscribe((response) => {
      this.userDetail = response.data;
      console.log('userdetail tnaımlandı');
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuthenticated()) {
      if (this.userDetail[0].operationClaimsId.includes(1)) {
        console.log('if');
        return true;
      } else {
        this.toastrService.error('Yetkiniz yok');

        return false;
      }
    } else {
      this.router.navigate(['login']);
      this.toastrService.error('Sisteme giriş yapmalısınız');
      return false;
    }
  }
}
//this.userDetail[0].operationClaimsId.includes(1)
