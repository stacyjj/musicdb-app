import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  
  artistSelctionControl = new FormControl();
  artistOptions: string[] = ['Ed Shereen', 'Sam Smith', 'Black Coffee']


  private mediaSubscription: Subscription;
  constructor(
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver,
  ){

  }

  ngOnInit(){

    this.mediaSubscription = this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        console.log(change.mqAlias);
        console.log(change.mediaQuery);
      }
    );
  }

  ngAfterViewInit(){

  }

  ngOnDestroy (){
    if(this.mediaSubscription){
        this.mediaSubscription.unsubscribe();
    }
  }

}
