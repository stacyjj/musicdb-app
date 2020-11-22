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
    this._service.getArtists().subscribe(
      data => this.artistList(Array.of(data))
    )
  }

  artistList(data){
    this.artists = data[0].data;
    this.filteredArtists = this.searchArtistForm.valueChanges.pipe(
      startWith(''),
      map(value =>this.filter(value))
    );
  }

  displaySelection(selection){
    return (selection && selection.value) ? selection.value : '';
  }

  filter(filterValue){
    return this.artists.filter(option => option.artist.name.includes(filterValue));
  }
}