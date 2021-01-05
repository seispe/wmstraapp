import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReimpresionPage } from './reimpresion.page';

describe('ReimpresionPage', () => {
  let component: ReimpresionPage;
  let fixture: ComponentFixture<ReimpresionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimpresionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReimpresionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
