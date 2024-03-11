import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../services/product/product.service';

import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable, zip } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-create',
  standalone: true,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [ProductService],
})
export class ProductCreateComponent {
  formGroup!: FormGroup;
  images: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      description: '',
      saleValue: 0,
      stock: 0,
    });
  }

  onSubmit() {
    console.log('Submit', this.formGroup.value);
    const data = this.formGroup.value;
    this.productService
      .create({
        description: data.description,
        saleValue: data.saleValue,
        stock: data.stock,
      })
      .subscribe({
        next: (product) => {
          const $images = this.images.map((img) => {
            const formData = new FormData();
            formData.append('image', img.file);
            return this.productService.uploadImage(product.guid, formData);
          });
          zip(...$images).subscribe({
            next: (res) => {
              this.router.navigate(['product/list']);
            },
            error: (err) => {
              console.log('Images Error', err);
            },
          });
        },
        error: (err) => {
          console.log('Error Response', err);
        },
      });
  }

  addImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images.push({
        data: reader.result as string,
        file: file,
      });
    };
    reader.readAsDataURL(file);
  }

  removeImage(image: { data: string }): void {
    this.images = this.images.filter((i) => i.data !== image.data);
  }
}
