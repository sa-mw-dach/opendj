export interface TrackItem {
  trackName: string;
  albumName: string;
  image: string;
  resourceURI: string;
  artistName: string;
  id?: string;
}

export interface Playlist {
  name: string;
  _id: string;
  tracks: Array<TrackItem>;
}