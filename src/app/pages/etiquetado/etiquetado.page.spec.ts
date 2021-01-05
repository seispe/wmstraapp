import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtiquetadoPage } from './etiquetado.page';

describe('EtiquetadoPage', () => {
  let component: EtiquetadoPage;
  let fixture: ComponentFixture<EtiquetadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
