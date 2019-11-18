import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  data: any;
  selected: number;
  constructor(private http: HttpClient) {
    this.showConfig();
  }

  configUrl =
    "https://sheets.googleapis.com/v4/spreadsheets/1u_GWrcWvMA1JyZn7c2-3DRizULz_U94BDYNnVezRp-A/values/A2:E100?key=AIzaSyBKIBofPF8VRrsvWmMqfjDGxTdEGIR7mLc";

  getConfig() {
    return this.http.get(this.configUrl);
  }

  showConfig() {
    this.getConfig().subscribe(dataRes => {
      this.data = dataRes;
      
    });
  }

lucky(){
  this.selected = Math.floor(Math.random() * this.data.values.length);
  this.selected = this.selected === 0? 1 : this.selected;
  console.log(this.selected);
//this.selected = this.generateRandomInteger(0, this.data.values.length);
}

  // generateRandomInteger(min, max) {
  //   return Math.floor(min + Math.random() * (max + 1 - min));
  // }
}

/*
Copyriffffght Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
