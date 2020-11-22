import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DeezerService } from 'src/app/core/service/deezer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  searchArtistForm = new FormControl();
  filteredArtists: Observable<string[]>;

  artists = [];

  constructor(private _service:DeezerService) {}

  ngOnInit(){
    this.searchArtistForm.valueChanges.subscribe(searchItem => {
      this._service.getArtists(searchItem).subscribe(
        searchResponse => this.artistList(Array.of(searchResponse))
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
    return this.artists.filter(option => option.artist.name.includes(filterValue));
  }

  displaySelection(selection){
    return (selection && selection.artist.name) ? selection.artist.name : '';
  }

  

}