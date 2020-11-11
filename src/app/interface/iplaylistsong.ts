import {IPlayList} from './i-play-list';
import {ISong} from './isong';

export interface IPlaylistSong {
  id?: number;
  playlist?: IPlayList;
  song?: ISong;
}
