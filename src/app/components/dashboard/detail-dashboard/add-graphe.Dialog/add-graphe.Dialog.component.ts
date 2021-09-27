import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../../../users/add-user/add-user.dialog.component';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'node-add-graphe.Dialog',
  templateUrl: './add-graphe.Dialog.component.html',
  styleUrls: ['./add-graphe.Dialog.component.css']
})
export class AddGrapheDialogComponent implements OnInit {
  selectedValue: string | undefined;


  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>,) { }

  public saveAdd(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
  @ViewChild('fileInput')

  fileInput :any|undefined;

  file: File | null = null;

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }
}
