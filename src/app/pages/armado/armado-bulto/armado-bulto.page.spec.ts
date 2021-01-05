import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArmadoBultoPage } from './armado-bulto.page';

describe('ArmadoBultoPage', () => {
  let component: ArmadoBultoPage;
  let fixture: ComponentFixture<ArmadoBultoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmadoBultoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArmadoBultoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
