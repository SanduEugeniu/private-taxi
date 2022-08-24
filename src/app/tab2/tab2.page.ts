import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  staticPosition;
  dinamycPosition;
  count = 0;
  constructor(private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.staticPosition = {latitude:resp.coords.latitude , longitude: resp.coords.longitude };
      console.log(this.staticPosition )
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      if ('coords' in data) {
        this.dinamycPosition = {longitude: data.coords.longitude, latitude: data.coords.latitude};
      }
      this.count = this.count + 1;
      console.log(this.dinamycPosition)
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

}
