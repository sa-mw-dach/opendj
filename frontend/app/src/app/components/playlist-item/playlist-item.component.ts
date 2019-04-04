import { Component, OnInit, Input } from '@angular/core';
import {Track } from '../../../../sdk/playlist/model/track';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {

  @Input() track: Track;

  ngOnInit() {}

}
