import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { PlaylistItemComponent } from '../components/playlist-item/playlist-item.component';
import { ActiveTrackComponent } from '../components/active-track/active-track.component';
import { FooterComponent } from '../components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    PlaylistItemComponent,
    ActiveTrackComponent,
    FooterComponent
  ]
})
export class HomePageModule {}
