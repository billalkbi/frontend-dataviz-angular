import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddGrapheDialogComponent } from './add-graphe.Dialog/add-graphe.Dialog.component';

@Component({
  selector: 'node-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isPopupOpened = true;
  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  addGraphe(){
    this.isPopupOpened = true;
        const dialogRef = this.dialog.open(AddGrapheDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;


    });
  }
}
