import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AddPublicationComponent } from './add-publication.component';
import { PublicationsService } from 'src/app/services/publications.service';
import { Publication } from 'src/app/models/publication.model';

describe('AddPublicationComponent', () => {
  let component: AddPublicationComponent;
  let fixture: ComponentFixture<AddPublicationComponent>;
  let mockPublicationService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockPublicationService = {
      addPublication: jasmine.createSpy('addPublication').and.returnValue(of({})),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [AddPublicationComponent],
      providers: [
        { provide: PublicationsService, useValue: mockPublicationService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(AddPublicationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add publication and navigate to publications page', () => {
    spyOn(component, 'addPublication').and.callThrough();
    component.addPublicationRequest = {
      id: 'new_id',
      title: 'New Title',
      description: 'New Description',
      date: new Date(),
      imgUrl: 'new-url',
    };

    component.addPublication();
    expect(mockPublicationService.addPublication).toHaveBeenCalledWith(component.addPublicationRequest);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['publications']);
  });
});
