import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PlaylistsService } from '../../sdk/playlist/api/playlists.service';
import { AddTrackService } from '../../sdk/playlist/api/addTrack.service';
import { DefaultService as SpotifyService } from '../../sdk/spotify-provider/api/default.service';

export const BASE_PATH = '';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: 'https://localhost:3000'
    },
    StatusBar,
    SplashScreen,
    PlaylistsService,
    AddTrackService,
    SpotifyService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
