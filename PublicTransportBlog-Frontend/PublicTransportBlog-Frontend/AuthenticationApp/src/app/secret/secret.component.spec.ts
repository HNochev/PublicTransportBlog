import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecretComponent } from './secret.component';
import { AuthenticationService } from './../services/authentication.service';
import { WeatherClient } from './../clients/weather.client';
import { Observable, of } from 'rxjs';

describe('SecretComponent', () => {
  let component: SecretComponent;
  let fixture: ComponentFixture<SecretComponent>;
  let mockAuthenticationService: jasmine.SpyObj<AuthenticationService>;
  let mockWeatherClient: jasmine.SpyObj<WeatherClient>;

  beforeEach(async () => {
    mockAuthenticationService = jasmine.createSpyObj('AuthenticationService', ['logout']);
    mockWeatherClient = jasmine.createSpyObj('WeatherClient', ['getWeatherData']);

    await TestBed.configureTestingModule({
      declarations: [SecretComponent],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: WeatherClient, useValue: mockWeatherClient },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not fetch weather data on initialization', () => {
    mockWeatherClient.getWeatherData.and.returnValue(of(null)); // Return null or an empty object

    fixture.detectChanges();

    expect(component.weather).toBeUndefined();
  });

  it('should call AuthenticationService logout method on logout', () => {
    component.logout();

    expect(mockAuthenticationService.logout).toHaveBeenCalled();
  });
});