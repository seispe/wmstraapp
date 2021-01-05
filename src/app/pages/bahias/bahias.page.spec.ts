import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BahiasPage } from './bahias.page';

describe('BahiasPage', () => {
  let component: BahiasPage;
  let fixture: ComponentFixture<BahiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BahiasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BahiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
