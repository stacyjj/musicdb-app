import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';  

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeGetArtistBioFunction = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  getArtistBio(artist) {    
    this.invokeGetArtistBioFunction.emit(artist);    
  }  
}
