import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pPaymentGatewayComponent } from './p2p-payment-gateway.component';

describe('P2pPaymentGatewayComponent', () => {
  let component: P2pPaymentGatewayComponent;
  let fixture: ComponentFixture<P2pPaymentGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P2pPaymentGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pPaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
