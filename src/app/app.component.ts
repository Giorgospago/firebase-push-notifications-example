import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private afMessaging: AngularFireMessaging) {
    this.requestPermission();
  }

  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
          this.listen();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  listen() {
    this.afMessaging.messages.subscribe((payload: any) => {
      console.log(payload.notification);
    }, (error) => {
      console.error(error);
    });
  }

  deleteToken() {
    this.afMessaging.getToken
      .pipe(mergeMap(token => this.afMessaging.deleteToken(token)))
      .subscribe((token) => { console.log('Deleted!'); });
  }

}
