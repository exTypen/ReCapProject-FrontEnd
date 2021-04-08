import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color
  colorUpdateForm: FormGroup
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["colorId"]){
        this.getColorById(params["colorId"])
      }
    })
    
  }

  async getColorById(id:number){
    this.color = (await this.colorService.getById(id).toPromise()).data[0]
    this.createColorUpdateForm()
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      ColorName: [this.color.colorName, Validators.required]
    });
  }

  update() {
   
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({colorId:this.color.colorId}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
