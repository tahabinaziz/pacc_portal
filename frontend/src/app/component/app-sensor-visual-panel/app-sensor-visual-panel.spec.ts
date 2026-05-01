import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSensorVisualPanel } from './app-sensor-visual-panel';

describe('AppSensorVisualPanel', () => {
  let component: AppSensorVisualPanel;
  let fixture: ComponentFixture<AppSensorVisualPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSensorVisualPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSensorVisualPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
