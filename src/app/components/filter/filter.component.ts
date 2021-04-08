import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  brands: Brand[] = []; 
  brandId: number = 0

  colors: Color[] = [];
  colorId: number = 0

  filterTextBrand = ""
  filterTextColor = ""

  constructor(private brandService: BrandService,
    private router: Router,
    private colorService: ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors()
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  filter() {
    this.router.navigate(['/cars/'+this.brandId+"/"+this.colorId])
  }
}
