import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContainerComponent } from './cardcontainer.component';

describe('ThumbnailComponent', () => {
  let component: CardContainerComponent;
  let fixture: ComponentFixture<CardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
