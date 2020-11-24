import { Component, OnInit } from '@angular/core';
import { DeezerService } from 'src/app/core/service/deezer-api/deezer.service';
import {EventEmitterService} from 'src/app/core/service/common/event-emitter.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  chartData = [];
  noOfFansData = null;
  displayData = [];
  pageLoading = true;
  errorPage = false;

  constructor(private _service: DeezerService, private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void{
    this.pageLoading = true;
    this._service.getChart().subscribe(
      chartData => {
        this.chartDataList(Array.of(chartData))
      },error => {
        this.errorPage = true;
      });
  }

  chartDataList(chartData){
    this.chartData = chartData[0].data;
    this.chartData.forEach((element,index) => {
      this._service.getNoOfFans(element.artist.id).subscribe(
        fanData => {
          this.noOfFansData = fanData;
          this.displayData.push({
            coverTitle: element.album.title,
            coverImg: element.album.cover_xl,
            artistImg: element.artist.picture_medium,
            artistName:element.artist.name,
            artistId: element.artist.id,
            noOfFans:  this.noOfFansData.nb_fan
          });
          if(this.chartData.length-1 === index){
            this.pageLoading = false;
          }
        },error => {
          this.errorPage = true;
        });
    });
  }

  artistSelection(artistDetails){    
    this.eventEmitterService.getArtistBio(artistDetails);    
  }  

}
