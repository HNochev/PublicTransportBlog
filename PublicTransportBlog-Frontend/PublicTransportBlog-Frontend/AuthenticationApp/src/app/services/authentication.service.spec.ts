import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthenticationClient } from '../clients/authentication.client';
import { of } from 'rxjs';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let authenticationClientSpy: jasmine.SpyObj<AuthenticationClient>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authenticationClientSpy = jasmine.createSpyObj('AuthenticationClient', ['login', 'register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: AuthenticationClient, useValue: authenticationClientSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authenticationService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should login and navigate to home', () => {
    const username = 'testuser';
    const password = 'testpassword';
    const token = 'testtoken';

    authenticationClientSpy.login.and.returnValue(of(token));

    authenticationService.login(username, password);

    expect(authenticationClientSpy.login).toHaveBeenCalledWith(username, password);
    expect(localStorage.getItem('token')).toEqual(token);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should register, login, and navigate to home', () => {
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'testpassword';
    const token = 'testtoken';

    authenticationClientSpy.register.and.returnValue(of(token));

    authenticationService.register(username, email, password);

    expect(authenticationClientSpy.register).toHaveBeenCalledWith(username, email, password);
    expect(localStorage.getItem('token')).toEqual(token);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should logout and navigate to login', () => {
    authenticationService.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return true if token is present', () => {
    localStorage.setItem('token', 'testtoken');

    const isLoggedIn = authenticationService.isLoggedIn();

    expect(isLoggedIn).toBeTrue();
  });

  it('should return false if token is not present', () => {
    localStorage.removeItem('token');

    const isLoggedIn = authenticationService.isLoggedIn();

    expect(isLoggedIn).toBeFalse();
  });

  it('should return token if logged in', () => {
    localStorage.setItem('token', 'testtoken');

    const token = authenticationService.getToken();

    expect(token).toEqual('testtoken');
  });

  it('should return null if not logged in', () => {
    localStorage.removeItem('token');

    const token = authenticationService.getToken();

    expect(token).toBeNull();
  });
});