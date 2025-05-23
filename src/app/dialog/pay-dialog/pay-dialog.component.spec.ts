import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDialogComponent } from './pay-dialog.component';

describe('PayDialogComponent', () => {
  let component: PayDialogComponent;
  let fixture: ComponentFixture<PayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
