import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { PublicationsService } from 'src/app/services/publications.service';
import { trigger, state, style, animate, transition, keyframes, query, stagger } from '@angular/animations'

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.css'],
  animations: [
    trigger('photoAnimation', [
      transition('* => *', [
        style({transform: 'translateX(-100%)'}),
            animate('1500ms', style({transform: 'translateX(0)'}))   
      ])
    ])
  ]
})
export class PublicationDetailComponent implements OnInit {
  
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

  deletePublication(id: string){
    this.publicationService.deletePublication(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['publications']);
      }
    })
  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}