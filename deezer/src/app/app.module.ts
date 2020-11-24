import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './core/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { SearchComponent } from './layout/search/search.component';
import { DeezerInterceptor } from './core/service/deezer-api/deezer.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ArtistBioPageComponent } from './layout/artist-bio-page/artist-bio-page.component';
import { RouterModule, Routes } from '@angular/router';
import { EventEmitterService } from './core/service/common/event-emitter.service';
import { ErrorPageComponent } from './layout/error-page/error-page.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'artist', component: ArtistBioPageComponent },
  { path: 'error', component: ErrorPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    SearchComponent,
    ArtistBioPageComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:DeezerInterceptor, multi:true},
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
