import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDeleteDemandComponent } from './dialog-delete-demand.component';

describe('DialogDeleteProductComponent', () => {
  let component: DialogDeleteDemandComponent;
  let fixture: ComponentFixture<DialogDeleteDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteDemandComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogDeleteDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
