import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { PublicationsService } from 'src/app/services/publications.service';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent implements OnInit {
  addPublicationRequest: Publication = {
    id: '',
    title: '',
    description: '',
    date: new Date(),
    imgUrl: '',
  };

  titleMinLength = 5;
  descriptionMinLength = 30; 
  titleMaxLength = 50;
  descriptionMaxLength = 3000;

  isFormValid = false;

  constructor(private publicationService: PublicationsService, private router: Router) {}

  ngOnInit(): void {}

  updateFormValidity() {
    this.isFormValid =
      this.addPublicationRequest.title.length >= this.titleMinLength &&
      this.addPublicationRequest.title.length <= this.titleMaxLength &&
      this.addPublicationRequest.description.length >= this.descriptionMinLength &&
      this.addPublicationRequest.description.length <= this.descriptionMaxLength;
  }

  addPublication() {
    if (this.isFormValid) {
      this.publicationService.addPublication(this.addPublicationRequest).subscribe({
        next: (publication) => {
          this.router.navigate(['publications']);
        },
      });
    }
  }
}
