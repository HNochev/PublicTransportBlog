import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { EditPublicationComponent } from './edit-publication.component';
import { PublicationsService } from 'src/app/services/publications.service';
import { Publication } from 'src/app/models/publication.model';

describe('EditPublicationComponent', () => {
  let component: EditPublicationComponent;
  let fixture: ComponentFixture<EditPublicationComponent>;
  let mockActivatedRoute: any;
  let mockPublicationService: any;
  let mockRouter: any;

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
      updatePublication: jasmine.createSpy('updatePublication').and.returnValue(of({})),
      deletePublication: jasmine.createSpy('deletePublication').and.returnValue(of({})),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [EditPublicationComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PublicationsService, useValue: mockPublicationService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    fixture = TestBed.createComponent(EditPublicationComponent);
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

  it('should update publication and navigate to publications page', () => {
    spyOn(component, 'updatePublication').and.callThrough();
    component.updatePublication();
    expect(mockPublicationService.updatePublication).toHaveBeenCalledWith(
      component.publicationData.id,
      component.publicationData
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['publications']);
  });

  it('should delete publication and navigate to publications page', () => {
    const sampleId = 'sample_id';
    component.deletePublication(sampleId);
    expect(mockPublicationService.deletePublication).toHaveBeenCalledWith(sampleId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['publications']);
  });
});