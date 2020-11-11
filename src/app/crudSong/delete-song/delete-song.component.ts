import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {ISong} from '../../interface/isong';
import {ISongService} from '../../service/isong.service';


@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.scss']
})
export class DeleteSongComponent implements OnInit {
  song: ISong;
  constructor(private iSongService: ISongService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.iSongService.getSongByID(id).subscribe(next => this.song = next);
  }
  delete(): void {
    this.iSongService.deleteSong(this.song.songId).subscribe(
      next => this.router.navigateByUrl('/personal'));
    alert('Delete Book success fully!');
  }
}
