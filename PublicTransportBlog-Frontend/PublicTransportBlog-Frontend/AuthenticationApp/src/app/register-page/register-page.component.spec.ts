import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page.component';
import { AuthenticationService } from '../services/authentication.service';
import { MyErrorStateMatcher } from '../helpers/error-state-matcher';
import { passwordValidator } from '../helpers/password.validator';
import { of } from 'rxjs';
import { tick, fakeAsync } from '@angular/core/testing';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['register']);

    TestBed.configureTestingModule({
      declarations: [RegisterPageComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy }
      ]
    });

    mockAuthService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    component.ngOnInit();
    expect(component.registerForm.get('username')).toBeTruthy();
    expect(component.registerForm.get('email')).toBeTruthy();
    expect(component.registerForm.get('password')).toBeTruthy();
  });

  it('should set registerAttempted to true after form submission', fakeAsync(() => {
    component.ngOnInit();
    component.onSubmit();
    tick(5000);
    expect(component.registerAttempted).toBeTrue();
  }));

  it('should call AuthenticationService.register when form is submitted', () => {
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'testpassword';
  
    component.ngOnInit();
    component.registerForm.patchValue({ username, email, password });
  
    mockAuthService.register.and.stub(); // Stub the method, as it's a void method
  
    component.onSubmit();
  
    expect(mockAuthService.register).toHaveBeenCalledWith(username, email, password);
  });
});