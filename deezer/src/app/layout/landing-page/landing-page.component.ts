import { Component, OnInit } from '@angular/core';
import { DeezerService } from 'src/app/core/service/deezer.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  chartData = [];
  noOfFansData = null;
  displayData = [];

  constructor(private _service:DeezerService) { }

  ngOnInit(): void {
    this._service.getChart().subscribe(
      chartData => this.chartDataList(Array.of(chartData))
    )
  }

  chartDataList(chartData){
    this.chartData = chartData[0].data;
    this.chartData.forEach(element => {
      this._service.getNoOfArtists(element.artist.id).subscribe(
        fanData => {
          this.noOfFansData = fanData;
          this.displayData.push({
            img: element.artist.picture_medium,
            artistName:element.artist.name,
            noOfFans:  this.noOfFansData.nb_fan
          })
        }
      )
    })
    console.log(this.displayData);
  }

}
