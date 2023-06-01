import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsAddTemplateFormComponent } from './rooms-add-template-form.component';

describe('RoomsAddTemplateFormComponent', () => {
  let component: RoomsAddTemplateFormComponent;
  let fixture: ComponentFixture<RoomsAddTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsAddTemplateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsAddTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
