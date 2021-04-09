import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';


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
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CarDetailPageComponent } from './components/car-detail-page/car-detail-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { FilterComponent } from './components/filter/filter.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCarsComponent } from './components/admin-cars/admin-cars.component';
import { AdminRentalsComponent } from './components/admin-rentals/admin-rentals.component';
import { AdminFilterComponent } from './components/admin-filter/admin-filter.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ProfileRentalsComponent } from './components/profile-rentals/profile-rentals.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}

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
    AdminFilterComponent,
    CarUpdateComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    CarFilterPipe,
    BrandFilterPipe,
    ColorFilterPipe,
    ProfileComponent,
    UpdatePasswordComponent,
    ProfileRentalsComponent,
    ProfileUpdateComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ButtonModule,
    CardModule ,
    SplitButtonModule ,
    MenuModule ,
    TableModule ,
    ConfirmDialogModule,
    DropdownModule,
    PasswordModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    DynamicDialogModule,
    CheckboxModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DialogService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
