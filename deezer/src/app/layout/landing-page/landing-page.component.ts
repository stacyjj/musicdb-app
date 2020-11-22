import { Component, OnInit } from '@angular/core';
import { DeezerService } from 'src/app/core/service/deezer.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  chartData = [];

  constructor(private _service:DeezerService) { }

  ngOnInit(): void {
    this._service.getChart().subscribe(
      data => this.chartDataList(Array.of(data))
    )
  }

  chartDataList(data){
    this.chartData = data[0].data;
  }

}
