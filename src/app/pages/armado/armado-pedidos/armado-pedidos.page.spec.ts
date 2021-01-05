import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArmadoPedidosPage } from './armado-pedidos.page';

describe('ArmadoPedidosPage', () => {
  let component: ArmadoPedidosPage;
  let fixture: ComponentFixture<ArmadoPedidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmadoPedidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArmadoPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
