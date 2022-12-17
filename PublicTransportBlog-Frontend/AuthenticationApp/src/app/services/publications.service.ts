import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publication } from '../models/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiUrl + '/publicationAll');
  }

  addPublication(addPublicationRequest: Publication): Observable<Publication>{
    addPublicationRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Publication>(this.apiUrl + '/publicationPost', addPublicationRequest);
  }

  getPublication(id: string): Observable<Publication>{
    return this.http.get<Publication>(this.apiUrl + '/publicationDetail/' + id);
  }

  updatePublication(id: string, updatePublicationRequest: Publication): Observable<Publication>{
    return this.http.put<Publication>(this.apiUrl + '/publicationUpdate/' + id, updatePublicationRequest);
  }

  deletePublication(id: string): Observable<Publication>{
    return this.http.delete<Publication>(this.apiUrl + '/publicationDelete/' + id);
  }
}
