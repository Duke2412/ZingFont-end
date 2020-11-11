import { Component, OnInit } from '@angular/core';
import {IPlayList} from "../../interface/i-play-list";
import {IplaylistService} from "../../service/iplaylist.service";

@Component({
  selector: 'app-all-play-list',
  templateUrl: './all-play-list.component.html',
  styleUrls: ['./all-play-list.component.scss']
})
export class AllPlayListComponent implements OnInit {
  playLists: IPlayList[] = [];
  constructor(private iPlaylistService: IplaylistService) { }

  ngOnInit(): void {
    this.getAllPlayList();
  }

  getAllPlayList(): IPlayList[] {
    this.iPlaylistService.getAllPlayLists().subscribe(pr => {
      this.playLists = pr
    })
    return this.playLists
  }
}
