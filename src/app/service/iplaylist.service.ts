import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPlayList} from '../interface/i-play-list';


const API_URL = 'http://localhost:8080/playlist';

@Injectable({
  providedIn: 'root'
})
export class IplaylistService {

  constructor(private http: HttpClient) { }

  getPlayListByUser(id: number): Observable<IPlayList[]> {
    return this.http.get<IPlayList[]>(API_URL + `/listByUid/${id}`)
  }
  createPlayList(playList: IPlayList): Observable<IPlayList> {
    return this.http.post<IPlayList>(API_URL + `/create-playlist`, playList)
  }
  getPlayListById(id: number): Observable<IPlayList> {
    return this.http.get<IPlayList>(API_URL + `/${id}`)
  }
  updatePlaylist(id: number, playlist: IPlayList): Observable<IPlayList> {
    return this.http.put<IPlayList>(API_URL+ `/update-playlist/${id}`, playlist)
  }
  getAllPlayLists():Observable<IPlayList[]>{
    return this.http.get<IPlayList[]>(API_URL)
  }

}
