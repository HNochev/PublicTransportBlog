import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './helpers/auth.guard';
import { SecretComponent } from './secret/secret.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicationsListComponent } from './components/publications/publications-list/publications-list.component';
import { AddPublicationComponent } from './components/publications/add-publication/add-publication.component';
import { EditPublicationComponent } from './components/publications/edit-publication/edit-publication.component';
import { PublicationDetailComponent } from './components/publications/publication-detail/publication-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SecretComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'publications',
    component: PublicationsListComponent,
  },
  {
    path: 'publications/add',
    component: AddPublicationComponent,
  },
  {
    path: 'publications/edit/:id',
    component: EditPublicationComponent,
  },
  {
    path: 'publications/detail/:id',
    component: PublicationDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
