import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ShareEventService} from "../service/share-event.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentSong: String;

  constructor(
    private cookie: CookieService,
    private shareEvent: ShareEventService
  ) { }

  ngOnInit(): void {
  }

  onChanges(){
    this.shareEvent.emitChange('123');
  }

}
