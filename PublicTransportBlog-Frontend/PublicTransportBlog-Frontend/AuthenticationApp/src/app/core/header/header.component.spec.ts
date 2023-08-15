import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header text', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const headerText = headerElement.querySelector('.header-text')?.textContent;
    expect(headerText).toContain('Welcome to the Best Online Books Factory');
    expect(headerText).toContain('Choose a book to read.');
  });
});