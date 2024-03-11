import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-product',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog-delete-demand.component.html',
  styleUrl: './dialog-delete-demand.component.scss',
})
export class DialogDeleteDemandComponent {
  constructor(private dialogRef: MatDialogRef<DialogDeleteDemandComponent>) {}

  confirm() {
    this.dialogRef.close(true);
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
