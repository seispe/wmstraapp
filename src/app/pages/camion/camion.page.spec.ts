import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CamionPage } from './camion.page';

describe('CamionPage', () => {
  let component: CamionPage;
  let fixture: ComponentFixture<CamionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CamionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
