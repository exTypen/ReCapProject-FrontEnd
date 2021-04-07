import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-admin-filter',
  templateUrl: './admin-filter.component.html',
  styleUrls: ['./admin-filter.component.css']
})
export class AdminFilterComponent implements OnInit {

  brands: Brand[]
  colors: Color[]
  constructor(private colorService: ColorService,
    private brandSerivce:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors()
    this.getBrands()
  }

  deleteColor(color: Color){
    this.colorService.delete(color).subscribe((response)=>{
      if(response.success){
        this.toastrService.success("Renk silindi")
        window.location.reload()

      }else{
        this.toastrService.error("Hata")
      }
    })
  }

  deleteBrand(brand: Brand){
    this.brandSerivce.delete(brand).subscribe((response)=>{
      if(response.success){
        this.toastrService.success("Marka silindi")
        window.location.reload()

      }else{
        this.toastrService.error("Hata")
      }
    })
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data
    })
  }

  getBrands(){
    this.brandSerivce.getBrands().subscribe((response) =>{
      this.brands = response.data
    })
  }
}
