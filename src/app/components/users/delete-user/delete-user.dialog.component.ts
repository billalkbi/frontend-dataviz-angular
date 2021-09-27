import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'node-delete-user',
  templateUrl: './delete-user.dialog.component.html',
  styleUrls: ['./delete-user.dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {
  errorMessage: any;
 user: any= {};



  constructor(private usersService: UsersService,
              protected notificationService : NotificationService,
              public dialogRef: MatDialogRef<DeleteUserDialogComponent >,
              @Inject(MAT_DIALOG_DATA) public id: any
             ) { }

  ngOnInit( ): void {
    this.usersService.getUser(this.id)
    .subscribe(user=>this.user=user)
  }


  onNoClick(): void {
    this.dialogRef.close();
   }

  confirmDelete(){
    this.usersService.deleteUser(this.id)
    .subscribe(() => {

        this.notificationService.warn('! Deleted successfully');

      }, (err) => {
        this.errorMessage=err;


    });

  }

}
