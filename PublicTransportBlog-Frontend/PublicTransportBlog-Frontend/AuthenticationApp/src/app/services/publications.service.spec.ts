import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PublicationsService } from './publications.service';
import { Publication } from '../models/publication.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('PublicationsService', () => {
  let service: PublicationsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublicationsService],
    });

    service = TestBed.inject(PublicationsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve publications from the API', () => {
    const mockPublications: Publication[] = [
      { id: '1', title: 'Publication 1', description: 'Description 1', date: new Date(), imgUrl: 'image1.jpg' },
      { id: '2', title: 'Publication 2', description: 'Description 2', date: new Date(), imgUrl: 'image2.jpg' },
    ];

    service.getAllPublications().subscribe((publications) => {
      expect(publications).toEqual(mockPublications);
    });

    const req = httpTestingController.expectOne(service.apiUrl + '/publicationAll');
    expect(req.request.method).toEqual('GET');

    req.flush(mockPublications);
  });

  it('should add a new publication', () => {
    const mockPublication: Publication = {
      id: '1',
      title: 'New Publication',
      description: 'New Description',
      date: new Date(),
      imgUrl: 'new-image.jpg',
    };

    service.addPublication(mockPublication).subscribe((publication) => {
      expect(publication).toEqual(mockPublication);
    });

    const req = httpTestingController.expectOne(service.apiUrl + '/publicationPost');
    expect(req.request.method).toEqual('POST');

    req.flush(mockPublication);
  });
});