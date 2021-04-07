import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-admin-rentals',
  templateUrl: './admin-rentals.component.html',
  styleUrls: ['./admin-rentals.component.css']
})
export class AdminRentalsComponent implements OnInit {

  rentals:Rental[]
  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getRentals()
  }

  getRentals() {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentals = response.data;
    });
  }
}
