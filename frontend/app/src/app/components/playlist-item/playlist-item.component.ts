import { Component, OnInit, Input } from '@angular/core';

import { Track } from '../../models/add-song-request.model';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {

  @Input() Item: PlaylistItem
  constructor() { }

  ngOnInit() {}

}
