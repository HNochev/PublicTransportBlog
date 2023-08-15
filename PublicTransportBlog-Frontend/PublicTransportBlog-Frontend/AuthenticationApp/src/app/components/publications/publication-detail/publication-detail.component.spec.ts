import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PublicationDetailComponent } from './publication-detail.component';
import { PublicationsService } from 'src/app/services/publications.service';
import { Publication } from 'src/app/models/publication.model';

describe('PublicationDetailComponent', () => {
  let component: PublicationDetailComponent;
  let fixture: ComponentFixture<PublicationDetailComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockPublicationService: any;

  beforeEach(() => {
    mockActivatedRoute = {
      paramMap: of({ get: (id: string) => 'sample_id' }),
    };

    mockPublicationService = {
      getPublication: jasmine.createSpy('getPublication').and.returnValue(
        of({
          id: 'sample_id',
          title: 'Sample Title',
          description: 'Sample Description',
          date: new Date(),
          imgUrl: 'sample-url',
        } as Publication)
      ),
      deletePublication: jasmine.createSpy('deletePublication').and.returnValue(of({})),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [PublicationDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PublicationsService, useValue: mockPublicationService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(PublicationDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch publication data on component initialization', () => {
    component.ngOnInit();
    expect(mockPublicationService.getPublication).toHaveBeenCalledWith('sample_id');
    expect(component.publicationData.id).toBe('sample_id');
  });

  it('should delete publication and navigate to publications page', () => {
    const sampleId = 'sample_id';
    component.deletePublication(sampleId);
    expect(mockPublicationService.deletePublication).toHaveBeenCalledWith(sampleId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['publications']);
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
});