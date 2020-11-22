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

  getNoOfArtists(artistId){
    return this._http.get(environment.deezerURL +'artist/' + artistId,
    {observe:'body'
    });
  }

  getChart(){
    return this._http.get(environment.deezerURL +'chart/0/tracks',
    {observe:'body'
    });
  }
}
