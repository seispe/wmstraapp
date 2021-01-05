import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevolucionPage } from './devolucion.page';

describe('DevolucionPage', () => {
  let component: DevolucionPage;
  let fixture: ComponentFixture<DevolucionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevolucionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
