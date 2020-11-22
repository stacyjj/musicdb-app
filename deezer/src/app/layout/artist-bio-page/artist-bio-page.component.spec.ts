import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistBioPageComponent } from './artist-bio-page.component';

describe('ArtistBioPageComponent', () => {
  let component: ArtistBioPageComponent;
  let fixture: ComponentFixture<ArtistBioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistBioPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistBioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
