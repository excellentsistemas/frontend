import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-product',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog-delete-product.component.html',
  styleUrl: './dialog-delete-product.component.scss',
})
export class DialogDeleteProductComponent {
  constructor(private dialogRef: MatDialogRef<DialogDeleteProductComponent>) {}

  confirm() {
    this.dialogRef.close(true);
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
