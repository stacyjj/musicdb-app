import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  constructor(private _http:HttpClient) { }

  getArtists(){
    return this._http.get(environment.deezerURL +'search?q=eminem',
    {observe:'body'
    });
  }
}
