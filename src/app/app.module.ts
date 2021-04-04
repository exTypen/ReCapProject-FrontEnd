import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { JwtHelperService } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarComponent } from './components/car/car.component';

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CarDetailPageComponent } from './components/car-detail-page/car-detail-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FilterComponent } from './components/filter/filter.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCarsComponent } from './components/admin-cars/admin-cars.component';
import { AdminRentalsComponent } from './components/admin-rentals/admin-rentals.component';
import { AdminColorsComponent } from './components/admin-colors/admin-colors.component';
import { AdminBrandsComponent } from './components/admin-brands/admin-brands.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CarComponent,
    LoginComponent,
    RegisterComponent,
    CarAddComponent,
    CarDetailPageComponent,
    PaymentComponent,
    FilterComponent,
    AdminComponent,
    AdminCarsComponent,
    AdminRentalsComponent,
    AdminColorsComponent,
    AdminBrandsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //JwtHelperService,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
