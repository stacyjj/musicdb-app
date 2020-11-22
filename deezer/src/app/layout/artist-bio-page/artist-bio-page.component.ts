import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-bio-page',
  templateUrl: './artist-bio-page.component.html',
  styleUrls: ['./artist-bio-page.component.scss']
})
export class ArtistBioPageComponent implements OnInit {

  artistDetails = null;

  constructor(private router: Router) { 
    this.artistDetails = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(){
    console.log(this.artistDetails);
  }

  


}
