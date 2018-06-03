import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  isActive='true';
  role='admin'
  @ViewChild('inputUserName') userNameInputRef: ElementRef;
  @ViewChild('inputPassword') passwordInputRef: ElementRef;
  @ViewChild('inputPhoneNumber') phoneNumberInputRef: ElementRef;
  @Output() UserAdded = new EventEmitter<User>();
  constructor() { }

  ngOnInit() {
  }
  onAddItem() {
    const ingUserName = this.userNameInputRef.nativeElement.value;
    const ingPassword = this.passwordInputRef.nativeElement.value;
    const ingPhoneNumber = this.phoneNumberInputRef.nativeElement.value;

    const newUser = new User(ingUserName,ingPassword,ingPhoneNumber,this.role,this.isActive);
    this.UserAdded.emit(newUser);

  }
}
