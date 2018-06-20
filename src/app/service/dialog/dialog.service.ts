import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../../components/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  openDialog(title: string, content: string) {
    this.dialog.open(PopupComponent, {
      data: {
        title: title,
        content: content
      }
    });

  }
}

