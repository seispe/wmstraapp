import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogisticaPage } from './logistica.page';

describe('LogisticaPage', () => {
  let component: LogisticaPage;
  let fixture: ComponentFixture<LogisticaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogisticaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
