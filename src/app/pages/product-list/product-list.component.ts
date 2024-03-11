import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../services/product/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewProduct } from '../../services/product/product.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteProductComponent } from '../../ui/dialog-delete-product/dialog-delete-product.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  imports: [
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['description', 'saleValue', 'stock', 'actions'];
  dataSource: ViewProduct[] = [];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  newProduct() {
    this.router.navigate(['product/create']);
  }

  editProduct(guid: string) {
    this.router.navigate(['product/edit', guid]);
  }

  deleteProduct(guid: string) {
    this.dialog
      .open(DialogDeleteProductComponent)
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.productService.remove(guid).subscribe({
            next: (res) => {
              this.getAllProduct();
            },
            error: (err) => {
              console.log('Error Delete', err);
            },
          });
        }
      });
  }

  private getAllProduct() {
    this.productService.getAll().subscribe({
      next: (res) => (this.dataSource = res),
    });
  }
}
