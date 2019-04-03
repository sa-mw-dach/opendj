import { Component, OnInit } from '@angular/core';

import { PlaylistItem} from '../models/playlist-item.model'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  data: Array<PlaylistItem>;

  ngOnInit() {
    this.data = [{
      title: 'Song 1',
      subTitle: 'Song details like artist etc',
      img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
    }, {
      title: 'Song 1',
      subTitle: 'Song details like artist etc',
      img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
    }, {
      title: 'Song 1',
      subTitle: 'Song details like artist etc',
      img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
    }, {
      title: 'Song 1',
      subTitle: 'Song details like artist etc',
      img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
    }, {
      title: 'Song 1',
      subTitle: 'Song details like artist etc',
      img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
    }, {
      title: 'Song 1',
      subTitle: 'Song details like artist etc',
      img: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
    }];
  }
}
