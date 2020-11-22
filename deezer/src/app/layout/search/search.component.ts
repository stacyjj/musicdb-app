import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DeezerService } from 'src/app/core/service/deezer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  searchArtistForm = new FormControl();
  filteredArtists: Observable<string[]>;

  artists = [];
  noOfFansData = null;
  toptracks = null;

  constructor(private _service:DeezerService, private router : Router) {}

  ngOnInit(){
    this.searchArtistForm.valueChanges.subscribe(searchItem => {
      this._service.getArtists(searchItem).subscribe(
        searchResponse => searchItem? this.artistList(Array.of(searchResponse)):''
      )
    })
  }

  artistList(searchResponse){
    this.artists = searchResponse[0].data;
    this.filteredArtists = this.searchArtistForm.valueChanges.pipe(
      startWith(''),
      map(value =>this.filter(value))
    );
  }

  filter(filterValue){
      return this.artists.filter(option =>option.artist.name.includes(filterValue));
  }

  displaySelection(selection){
    return (selection && selection.artist.name) ? selection.artist.name : '';
  }

  artistSelection(selectedArtist){
    this._service.getNoOfArtists(selectedArtist.artist.id).subscribe(
      fanData => {
        this.noOfFansData = fanData;
        this._service.getTopTracks(selectedArtist.artist.id).subscribe(
          topTrackData =>{
            this.toptracks = topTrackData;
            selectedArtist.noOfFans = this.noOfFansData.nb_fan;
            selectedArtist.topTracks = this.toptracks.data;
            console.log(selectedArtist);
            this.router.routeReuseStrategy.shouldReuseRoute = function () {
              return false;
          }
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(["artist"],  { state: selectedArtist });
          }
        )
      }
    )
  }

}