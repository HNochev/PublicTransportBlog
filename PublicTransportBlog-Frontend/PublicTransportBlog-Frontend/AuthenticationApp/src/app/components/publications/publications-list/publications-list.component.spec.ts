import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PublicationsListComponent } from './publications-list.component';
import { PublicationsService } from 'src/app/services/publications.service';
import { Publication } from 'src/app/models/publication.model';

describe('PublicationsListComponent', () => {
  let component: PublicationsListComponent;
  let fixture: ComponentFixture<PublicationsListComponent>;
  let mockPublicationsService: any;
  let mockRouter: any;

  beforeEach(() => {
    mockPublicationsService = {
      getAllPublications: jasmine.createSpy('getAllPublications').and.returnValue(
        of([
          {
            id: 'sample_id_1',
            title: 'Sample Title 1',
            description: 'Sample Description 1',
            date: new Date(),
            imgUrl: 'sample-url-1',
          },
          {
            id: 'sample_id_2',
            title: 'Sample Title 2',
            description: 'Sample Description 2',
            date: new Date(),
            imgUrl: 'sample-url-2',
          },
        ] as Publication[])
      ),
      deletePublication: jasmine.createSpy('deletePublication').and.returnValue(of({})),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [PublicationsListComponent],
      providers: [
        { provide: PublicationsService, useValue: mockPublicationsService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(PublicationsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch publications on component initialization', () => {
    component.ngOnInit();
    expect(mockPublicationsService.getAllPublications).toHaveBeenCalled();
    expect(component.publications.length).toBe(2); // Change this based on your mock data
  });

  it('should delete publication and navigate to publications page', () => {
    const sampleId = 'sample_id_1';
    component.deletePublication(sampleId);
    expect(mockPublicationsService.deletePublication).toHaveBeenCalledWith(sampleId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['publications']);
  });
});