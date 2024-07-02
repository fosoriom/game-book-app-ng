import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConsoleLayoutComponent } from './video-console-layout.component';

describe('VideoConsoleLayoutComponent', () => {
  let component: VideoConsoleLayoutComponent;
  let fixture: ComponentFixture<VideoConsoleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoConsoleLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoConsoleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
