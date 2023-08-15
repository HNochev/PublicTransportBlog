import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';
import { AuthenticationService } from '../services/authentication.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    authenticationService = jasmine.createSpyObj('AuthenticationService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.loginForm).toBeDefined();
  });
});