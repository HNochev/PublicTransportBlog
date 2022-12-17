import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { PublicationsService } from 'src/app/services/publications.service';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.css']
})
export class PublicationsListComponent implements OnInit {

  publications: Publication[] = [];
  constructor(private publicationsService: PublicationsService, private router: Router) {}

  ngOnInit(): void{
    this.publicationsService.getAllPublications()
    .subscribe({
      next: (publications) => {
        this.publications = publications;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  deletePublication(id: string){
    this.publicationsService.deletePublication(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['publications']);
      }
    })
  }
}
