import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DemandService } from '../../services/demand/demand.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogDeleteDemandComponent } from '../../ui/dialog-delete-demand/dialog-delete-demand.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demand-list',
  standalone: true,
  imports: [
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    CommonModule,
  ],
  providers: [DemandService],
  templateUrl: './demand-list.component.html',
  styleUrl: './demand-list.component.scss',
})
export class DemandListComponent implements OnInit {
  listDemand: any[] = [];

  constructor(
    private demandService: DemandService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDemand();
  }

  newDemand() {
    this.router.navigate(['demand/create']);
  }

  deleteDemand(demandGuid: string) {
    this.dialog
      .open(DialogDeleteDemandComponent)
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.demandService.remove(demandGuid).subscribe({
            next: (res) => {
              this.getAllDemand();
            },
            error: (err) => {
              console.log('Error', err);
            },
          });
        }
      });
  }

  private getAllDemand() {
    this.demandService.getAll().subscribe({
      next: (res) => {
        this.listDemand = res;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }
}
