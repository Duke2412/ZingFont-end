import {Iuser} from './iuser';
import {IArtist} from './iartist';

export interface ISong {
  songId?: number;
  name?: string;
  description?: string;
  cover_art_url?: string;
  artist?: IArtist;
  genre?: string;
  date?: Date;
  plays?: number;
  likes?: number;
  user?: Iuser;
  songFile?: any;
  song_url?: string;
  imgFile?: any;
}
