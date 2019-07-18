import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayMerchantDialogComponent } from './pay-merchant-dialog.component';

describe('PayMerchantDialogComponent', () => {
  let component: PayMerchantDialogComponent;
  let fixture: ComponentFixture<PayMerchantDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayMerchantDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayMerchantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
