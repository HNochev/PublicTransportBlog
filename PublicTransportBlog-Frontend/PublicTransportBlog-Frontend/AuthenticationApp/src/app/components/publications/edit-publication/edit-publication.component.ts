import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { PublicationsService } from 'src/app/services/publications.service';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.css']
})
export class EditPublicationComponent implements OnInit{
 
  publicationData: Publication = {
    id: '',
    title: '',
    description: '',
    date: new Date(),
    imgUrl: '',
  }

  constructor(private route: ActivatedRoute, private publicationService: PublicationsService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){
          this.publicationService.getPublication(id)
          .subscribe({
            next: (response) => {
              this.publicationData = response
            }
          });
        }
      }
    })
  }

  updatePublication(){
    this.publicationService.updatePublication(this.publicationData.id, this.publicationData)
    .subscribe({
      next: (respones) => {
        this.router.navigate(['publications'])
      }
    })
  }

  deletePublication(id: string){
    this.publicationService.deletePublication(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['publications']);
      }
    })
  }
}
