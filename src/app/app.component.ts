import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "slick-carousel/slick/slick.js";
import $ from "jquery";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  data: any;
  mode: string = undefined;

  selected: number;
  isFinish: boolean = true;
  filteredList: Array<any> = new Array();
  filteredModeList: Array<any> = new Array();
  constructor(private http: HttpClient) {
    this.showConfig();
  }

  configUrl =
    "https://sheets.googleapis.com/v4/spreadsheets/1u_GWrcWvMA1JyZn7c2-3DRizULz_U94BDYNnVezRp-A/values/A2:G100?key=AIzaSyBKIBofPF8VRrsvWmMqfjDGxTdEGIR7mLc";

  ngOnInit() {
    $(".slider").slick({
      slidesToShow: 1,
      centerMode: true,
      centerPadding: "60px",
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true
    });
  }
  getConfig() {
    return this.http.get(this.configUrl);
  }

  showConfig() {
    this.getConfig().subscribe(dataRes => {
      this.data = dataRes;
      this.changeMode();
    });
  }

  changeMode() {
    this.mode = this.mode == "Cheap" ? "Expensive" : "Cheap";
    console.log(this.mode);
    this.filteredList = [];
    this.filteredModeList = [];
    this.data.values.forEach(item => {
      if (item[3] === this.mode) {
        this.filteredModeList.push(item);
      }
    });
  }

  filter(type: string) {
    this.filteredList = [];
    this.selected = undefined;
    this.filteredModeList.forEach(item => {
      if (item[4] === type) {
        this.filteredList.push(item);
      }
    });
    this.lucky();
  }

  lucky() {
    let self = this;
    let count = 0;
    self.isFinish = false;
    let timerID = setInterval(() => {
      if (count < 30) {
        self.selected = Math.floor(
          Math.random() * this.filteredList.length + 1
        );
        self.selected = this.selected === 0 ? 1 : this.selected;
        console.log(this.selected);
        count = count + 1;
      } else {
        clearInterval(timerID);
        self.isFinish = true;
      }
    }, 30);
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
