import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImpresoraPage } from './impresora.page';

describe('ImpresoraPage', () => {
  let component: ImpresoraPage;
  let fixture: ComponentFixture<ImpresoraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpresoraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImpresoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
