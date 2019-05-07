import { Component, OnInit, Input } from '@angular/core';

import { Track } from './../../../../sdk/playlist/model/track';

@Component({
  selector: 'app-active-track',
  templateUrl: './active-track.component.html',
  styleUrls: ['./active-track.component.scss'],
})
export class ActiveTrackComponent implements OnInit {

  @Input() track: Track;

  ngOnInit() {
    console.log('now playing: ', this.track);
  }

}
