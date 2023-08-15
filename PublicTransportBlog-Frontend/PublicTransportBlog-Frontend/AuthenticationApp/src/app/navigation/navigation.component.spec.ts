import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { ToastrService } from 'ngx-toastr';
import { NavigationComponent } from './navigation.component';
import { AuthenticationService } from '../services/authentication.service';
import { of } from 'rxjs';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let mockAuthService: any;
  let mockRouter: any;
  let mockToastrService: any;

  beforeEach(() => {
    mockAuthService = {
      logout: jasmine.createSpy('logout'),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockToastrService = {
      success: jasmine.createSpy('success'),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Use RouterTestingModule
      declarations: [NavigationComponent],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: ToastrService, useValue: mockToastrService },
      ],
    });

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('sample_token');
    const result = component.isLogged();
    expect(result).toBe(true);
  });

  it('should return false if user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const result = component.isLogged();
    expect(result).toBe(false);
  });

  it('should toggle isExpanded value on expandNav()', () => {
    expect(component.isExpanded).toBe(false);
    component.expandNav();
    expect(component.isExpanded).toBe(true);
    component.expandNav();
    expect(component.isExpanded).toBe(false);
  });
});