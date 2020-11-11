import { Component, OnInit } from '@angular/core';
import {IplaylistService} from '../../service/iplaylist.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IPlayList} from '../../interface/i-play-list';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.scss']
})
export class EditPlaylistComponent implements OnInit {

  playlistForm: FormGroup;
  playlist: IPlayList = null;
  constructor(private iPlaylistService: IplaylistService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = (+this.activatedRoute.snapshot.params['id']);
    this.getPlaylistById(id);
    this.playlistForm = this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
    });
  }
  getPlaylistById(id: number) {
    this.iPlaylistService.getPlayListById(id).subscribe(p => {
      this.playlist = p
    })
  }
  update(): void {
    const playlist = this.playlistForm.value
    this.iPlaylistService.updatePlaylist(this.playlist.id, playlist).subscribe(() =>
      this.router.navigate(['/myPlaylist']))
  }

}
