import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable,  } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role=0;
  private notificationsCollection: AngularFirestoreCollection<any>;
  clinic: Observable<any[]>;
  items: Observable<any[]>;
  constructor(private userService: UserService,
  db: AngularFirestore) { 
    // this.items = db.collection('notifications').valueChanges();
    // console.log(this.items);
    // this.notificationsCollection = db.collection("notifications");
    // console.log(this.notificationsCollection);
    // this.items = db.collection('notifications').valueChanges();
    // console.log(this.items);
    this.notificationsCollection = db.collection("notifications").snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        console.log(data);
      });
    });
  }

  ngOnInit() {
    var result = this.userService.getUserClaims();
    this.role = parseInt(result.role);    
  }

}
