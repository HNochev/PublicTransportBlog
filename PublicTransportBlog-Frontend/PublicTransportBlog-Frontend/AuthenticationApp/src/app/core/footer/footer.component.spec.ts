import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for isLogged if token is in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('test-token');
    const isLogged = component.isLogged();
    expect(isLogged).toBeTrue();
  });

  it('should return false for isLogged if token is not in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const isLogged = component.isLogged();
    expect(isLogged).toBeFalse();
  });
});