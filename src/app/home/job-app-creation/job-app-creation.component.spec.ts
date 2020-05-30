import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobAppCreationComponent } from './job-app-creation.component';

describe('JobAppCreationComponent', () => {
  let component: JobAppCreationComponent;
  let fixture: ComponentFixture<JobAppCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAppCreationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobAppCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
