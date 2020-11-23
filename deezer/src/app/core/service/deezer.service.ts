import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  constructor(private _http:HttpClient) { }

  getChart(){
    return this._http.get(environment.deezerURL +'chart/0/tracks',
    {observe:'body'
    });
  }

  getArtists(artistName){
    return this._http.get(environment.deezerURL +'search?q=' + artistName,
    {observe:'body'
    });
  }

  getNoOfFans(artistId){
    return this._http.get(environment.deezerURL +'artist/' + artistId,
    {observe:'body'
    });
  }
  
  getTopTracks(artistId){
    return this._http.get(environment.deezerURL +'artist/'+artistId+'/top',
    {observe:'body'
    });
  }

  getAlbumReleaseDate(albumId){
    return this._http.get(environment.deezerURL +'album/'+ albumId,
    {observe:'body'
    });
  }
}
