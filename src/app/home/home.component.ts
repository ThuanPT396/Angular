import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ToasterService } from '../service/toast/toaster.service';
import { MyNotification } from '../model/notification.model';
import { AppheaderComponent } from '../components/appheader/appheader.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AppheaderComponent]
})
export class HomeComponent implements OnInit {
  role = 0;
  constructor(
    private userService: UserService,
    private toastService: ToasterService,
    private appheader: AppheaderComponent) {
  }

  ngOnInit() {
    var result = this.userService.getUserClaims();
    this.role = parseInt(result.role);

    // this.notifications.stateChanges(['added']).pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     console.log(data);
    //     this.toastService.Success(id, data.message);
    //     return { id, ...data };
    //   }))
    // );

    // this.notifications.snapshotChanges(['added', 'modified', 'removed']).pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     console.log(data);
    //     this.toastService.Success(id, data.message);
    //     return { id, ...data };
    //   }))
    // )
    // this.notifications.stateChanges(['added']).subscribe(collection => {
    //   for (var index in collection) {
    //     var item = collection[index];        
    //     const data = item.payload.doc.data();
    //     const id = item.payload.doc.id;
    //     console.log(data);
    //     this.toastService.Success(id, data.message);
    //   }
    //   console.log(collection);
    // })

    // this.notifications.snapshotChanges().map(
    //   actions => actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const id = a.payload.doc.id;
    //     this.toastService.Success(id, data.message);
    //     return { id, ...data };
    //   }))    
  }
}
