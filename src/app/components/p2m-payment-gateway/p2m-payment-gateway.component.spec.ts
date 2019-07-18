import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P2mPaymentGatewayComponent } from './p2m-payment-gateway.component';

describe('P2mPaymentGatewayComponent', () => {
  let component: P2mPaymentGatewayComponent;
  let fixture: ComponentFixture<P2mPaymentGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P2mPaymentGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P2mPaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
