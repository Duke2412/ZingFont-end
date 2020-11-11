import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPlaylistSong} from '../interface/iplaylistsong';
import {IPlayList} from '../interface/i-play-list';

const API_URL = 'http://localhost:8080/playlist-song'

@Injectable({
  providedIn: 'root'
})
export class PlaylistSongService {

  constructor(private http: HttpClient) { }

  getPlayListSong(playlistId: number): Observable<IPlaylistSong[]>  {
    return this.http.get<IPlaylistSong[]>(API_URL + `/playlist/`+ playlistId);
  }

  addPlaylistSong(playlistSong: IPlaylistSong): Observable<IPlaylistSong> {
    return this.http.post<IPlaylistSong>(API_URL + `/add-song`, playlistSong);
  }

  deletePlaylistSong(playlistSongId: number): Observable<IPlaylistSong> {
    return this.http.delete<IPlaylistSong>(API_URL + `/delete/${playlistSongId}`)
  }
}
