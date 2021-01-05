import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusquedaProductoPage } from './busqueda-producto.page';

describe('BusquedaProductoPage', () => {
  let component: BusquedaProductoPage;
  let fixture: ComponentFixture<BusquedaProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
