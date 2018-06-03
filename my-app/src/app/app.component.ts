import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadFeature = 'clinic';
  onNavigate(feature: string) {
    this.loadFeature = feature;
  }
}
