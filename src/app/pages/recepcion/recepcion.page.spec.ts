import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecepcionPage } from './recepcion.page';

describe('RecepcionPage', () => {
  let component: RecepcionPage;
  let fixture: ComponentFixture<RecepcionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecepcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
