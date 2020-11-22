import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  constructor(private _http:HttpClient) { }

  getArtists(artistName){
    return this._http.get(environment.deezerURL +'search?q=' + artistName,
    {observe:'body'
    });
  }

  getChart(){
    return this._http.get(environment.deezerURL +'chart',
    {observe:'body'
    });
  }
}
