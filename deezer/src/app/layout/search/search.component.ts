import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DeezerService } from 'src/app/core/service/deezer-api/deezer.service';
import { Router } from '@angular/router';
import {EventEmitterService} from 'src/app/core/service/common/event-emitter.service';


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
  albumDate = null;
  errorPage = false;
  bioLoading = false;
  bioDisplayData = {
    artistName: '',
    noOfFans: '',
    artistImg: '',
    topTracks: null
  };

  constructor(private _service: DeezerService, private router : Router, private eventEmitterService: EventEmitterService ) {}

  ngOnInit(): void{
    this.searchArtistForm.valueChanges.subscribe(searchItem => {
      this._service.getArtists(searchItem).subscribe(
        searchResponse => {
          searchItem ? this.artistList(Array.of(searchResponse)) : '';
        },error => {
          this.errorPage =true;
          this.error();
        });
    });

    if (this.eventEmitterService.subsVar == undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeGetArtistBioFunction.subscribe(
        (artist) => {    
        this.artistSelection(artist);    
      });    
    }   
  }

  artistList(searchResponse){
    this.artists = searchResponse[0].data;
    this.filteredArtists = this.searchArtistForm.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  filter(filterValue){
      return this.artists.filter(option => option.artist.name.includes(filterValue));
  }

  displaySelection(selection){
    return (selection && selection.artist.name) ? selection.artist.name : '';
  }


  artistSelection(selectedArtist){
    this.bioLoading = true;
    this._service.getTopTracks(selectedArtist.artistId?selectedArtist.artistId:selectedArtist.artist.id).subscribe(
      topTrackData => {
        this.toptracks = topTrackData;
        this.bioDisplayData.artistName = selectedArtist.artistName?selectedArtist.artistName:selectedArtist.artist.name;
        this.bioDisplayData.artistImg = selectedArtist.artistImg?selectedArtist.artistImg:selectedArtist.artist.picture_big;
        this.bioDisplayData.topTracks = this.toptracks.data;
        if(!selectedArtist.noOfFans){
          this._service.getNoOfFans(selectedArtist.artist.id).subscribe(
            fanData => {
              this.noOfFansData = fanData;
              this.bioDisplayData.noOfFans = this.noOfFansData.nb_fan;
              this.getAlbumReleaseDates(this.bioDisplayData);
            },error => {
              this.errorPage = true;
              this. error();
            });
        }else{
          this.bioDisplayData.noOfFans = selectedArtist.noOfFans;
          this.getAlbumReleaseDates(this.bioDisplayData);
        }
      },error => {
        this.errorPage = true;
        this. error();
      });
  }

  getTime(time){
    var date = new Date(time*1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return (`${hours}:${minutes}:${seconds}`);
  }

  getAlbumReleaseDates(selectedArtistDetails){
    selectedArtistDetails.topTracks.forEach((element, index) => {
      this._service.getAlbumReleaseDate(element.album.id).subscribe(
        albumDate => {
          this.albumDate = albumDate;
          selectedArtistDetails.topTracks[index].duration = this.getTime(selectedArtistDetails.topTracks[index].duration);
          selectedArtistDetails.topTracks[index].releaseDate = this.albumDate.release_date;
          if(selectedArtistDetails.topTracks.length-1 === index){
            this.loadBioPage(selectedArtistDetails);
          }
        },error => {
          this.errorPage = true;
          this. error();
        });
    });
    if(selectedArtistDetails.topTracks.length === 0){
      this.loadBioPage(selectedArtistDetails);
    }
    
  }
  
  loadBioPage(artistInfo){
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.bioLoading = false;
    this.router.navigate(["artist"],  { state: artistInfo });
  }

  error(){
    this.router.navigate(["error"]);
  }

}