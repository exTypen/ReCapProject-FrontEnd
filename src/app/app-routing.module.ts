import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCarsComponent } from './components/admin-cars/admin-cars.component';
import { AdminFilterComponent } from './components/admin-filter/admin-filter.component';
import { AdminRentalsComponent } from './components/admin-rentals/admin-rentals.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailPageComponent } from './components/car-detail-page/car-detail-page.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/:brandId/:colorId', component: CarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/cars/add', component: CarAddComponent},
  { path: 'car/payment/:carId', component: PaymentComponent },
  { path: 'car/page/:carId', component: CarDetailPageComponent },
  { path: 'admin', component: AdminComponent},//, canActivate:[AdminGuard]},
  { path: 'admin/rentals', component: AdminRentalsComponent },
  { path: 'admin/cars', component: AdminCarsComponent },
  { path: 'admin/cars/update/:carId', component: CarUpdateComponent },
  { path: 'admin/filter', component: AdminFilterComponent },
  { path: 'admin/colors/add', component: ColorAddComponent },
  { path: 'admin/colors/update/:colorId', component: ColorUpdateComponent },
  { path: 'admin/brands/update/:brandId', component: BrandUpdateComponent },
  { path: 'admin/brands/add', component: BrandAddComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
