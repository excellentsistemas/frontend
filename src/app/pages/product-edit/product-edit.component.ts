import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import * as base64 from 'base64-js';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [ProductService],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  images: any[] = [];
  formGroup: FormGroup = this.fb.group({
    description: '',
    saleValue: 0,
    stock: 0,
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  onSubmit() {
    const guid = this.activatedRoute.snapshot.params['guid'];
    const product = this.formGroup.value;
    this.productService
      .update({
        guid: guid,
        description: product.description,
        images: [],
        saleValue: product.saleValue,
        stock: product.stock,
      })
      .subscribe({
        next: (res) => {
          this.router.navigate(['product/list']);
        },
        error: (err) => {
          console.log('Error Edit', err);
        },
      });
  }

  private getProduct() {
    const guid = this.activatedRoute.snapshot.params['guid'];
    this.productService.getByGuid(guid).subscribe((product) => {
      this.formGroup.reset({
        description: product.description,
        saleValue: product.saleValue,
        stock: product.stock,
      });

      this.images = product.images.map((img) => {
        const imageBase64 = base64.fromByteArray(img.image.data);
        return {
          data: `data:${img.mimeType};base64, ${imageBase64}`,
          file: img,
        };
      });
    });
  }
}
