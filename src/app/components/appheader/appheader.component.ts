import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ToasterService } from '../../service/toast/toaster.service';
import { MyNotification } from '../../model/notification.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, pipe, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit, OnDestroy {
  username = ""
  fullName = ""
  phoneNumber = ""
  hidden = false;
  currentpw = ""
  newpw = ""
  confirmpw = ""
  textValidPW = "";
  textConfirmPW = "";
  private notiRef: AngularFirestoreCollection;
  private notiOnView: MyNotification[] = [];
  private static isFirstRun = true;
  private isInit = true;
  private subscriptionAdded: ISubscription;
  private subscriptionNoti: ISubscription;

  constructor(private router: Router, private userService: UserService, private toastService: ToasterService, private db: AngularFirestore) { }

  listenNotification() {
    var username = localStorage.getItem("username");
    this.notiRef = this.db.collection("callcenter/" + username + "/notifications", ref => ref.orderBy('serverTimestamp', 'desc'));
    var notifications = this.notiRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as MyNotification;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )

    this.subscriptionNoti = notifications.subscribe(docs => {
      this.notiOnView = [];      
      if (this.isInit && docs.length == 0) {
        this.isInit = false
      }
      docs.forEach(doc => {
        this.notiOnView.push(doc);
      })
    })

    var addedNotification = this.notiRef.stateChanges(['added']).pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as MyNotification;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
    this.subscriptionAdded = addedNotification.subscribe(docs => {      
      if (this.isInit) {
        this.isInit = false
      } else {
        docs.forEach(doc => {
          this.toastService.Success(doc.title, doc.message);
        })
      }
    })
  }

  onSelectNotification(id) {
    this.notiRef.doc(id).delete()
      .catch(err => {
        console.log(err);
      })
  }
  onClearNotification() {
    this.notiOnView.forEach(item => {
      this.notiRef.doc(item.id).delete()
        .catch(err => {
          console.log(err);
        })
    })
  }

  ngOnDestroy() {
    if (this.subscriptionAdded) {
      this.subscriptionAdded.unsubscribe();
    }
    if (this.subscriptionNoti) {
      this.subscriptionNoti.unsubscribe();
    }
  }

  ngOnInit() {
    this.listenNotification();

    var result = this.userService.getUserClaims();
    if (localStorage.getItem('role') != '1') {
      this.fullName = result.fullName
      this.hidden = true;
    } else {
      this.fullName = result.clinicName
      this.hidden = false;
    }
    this.username = result.username
    this.phoneNumber = result.phoneNumber
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  logout() {
    localStorage.removeItem('clinicName');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('role');
    localStorage.removeItem('firebaseToken')

  }
  checkPassword(username: string, password: string) {
    this.userService
      .userCheckPassword(username, password)
      .subscribe((response) => {
        var tmp = JSON.parse(JSON.stringify(response));
        if (tmp.status == true) {
          this.textValidPW = "";
        } else {
          this.textValidPW = "Mật khẩu không chính xác";
        }
      })
  }
  ConfirmPW(newpw, confirmpw) {
    if (newpw != confirmpw) {
      this.textConfirmPW = "Mật khẩu xác thực không đúng";
    } else {
      this.textConfirmPW = ""
    }
  }
  onChangePassword(username: string, password: string, newPassword: string) {
    if (this.newpw === this.confirmpw) {
      this.userService
        .userChangePassword(username, password, newPassword)
        .subscribe((response) => {
          var tmp = JSON.parse(JSON.stringify(response));
          if (tmp.status == true) {
            this.toastService.Success("Thay đổi mật khẩu thành công")
            this.logout();
          }
          else {
            this.toastService.Error("Mật khẩu không đúng. Thay đổi mật khẩu thất bại")
            this.currentpw = ''
          }
        },
      );
    } else {
      this.toastService.Error("Mật khẩu xác thực không đúng. Thay đổi mật khẩu thất bại.")
      this.newpw = ''
      this.confirmpw = ''
    }
  }
}
