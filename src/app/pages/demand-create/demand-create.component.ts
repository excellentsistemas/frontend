import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ProductService } from '../../services/product/product.service';
import { MatSelectModule } from '@angular/material/select';
import { DemandService } from '../../services/demand/demand.service';
import { ViewDemand } from '../../services/demand/demand.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogDeleteProductComponent } from '../../ui/dialog-delete-product/dialog-delete-product.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demand-create',
  standalone: true,
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
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './demand-create.component.html',
  styleUrl: './demand-create.component.scss',
  providers: [ProductService, DemandService],
})
export class DemandCreateComponent implements OnInit {
  dataSource = new MatTableDataSource<ViewDemand>();
  displayedColumns = ['description', 'stock', 'saleValue', 'amount', 'actions'];

  selectedProduct!: any;
  listProduct: any[] = [];

  formGroup = this.fb.group({
    amount: 0,
    product: [],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private demandService: DemandService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  saveDemand() {
    this.demandService.create(this.dataSource.data).subscribe({
      next: () => {
        this.router.navigate(['demand/list']);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }

  addProduct() {
    const formValue = this.formGroup.value;
    const product: any = formValue.product;

    this.dataSource.data.push({
      description: product.description,
      stock: product.stock,
      saleValue: product.saleValue,
      amount: formValue.amount || 0,
      productGuid: product.guid,
    });
    this.dataSource._updateChangeSubscription();
  }

  deleteProduct(product: string | any) {
    this.dialog
      .open(DialogDeleteProductComponent)
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          const productIndex = this.dataSource.data.indexOf(product);
          this.dataSource.data.splice(productIndex, 1);
          this.dataSource._updateChangeSubscription();
        }
      });
  }

  private getAllProducts() {
    this.productService.getAll().subscribe((result) => {
      this.listProduct = result;
    });
  }
}
