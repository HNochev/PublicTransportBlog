import { TokenInterceptor } from './helpers/token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretComponent } from './secret/secret.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NavigationComponent } from './navigation/navigation.component';
import { CoreModule } from './core/core.module';
import { PublicationsListComponent } from './components/publications/publications-list/publications-list.component';
import { AddPublicationComponent } from './components/publications/add-publication/add-publication.component';
import { EditPublicationComponent } from './components/publications/edit-publication/edit-publication.component';
import { PublicationDetailComponent } from './components/publications/publication-detail/publication-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SecretComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavigationComponent,
    PublicationsListComponent,
    AddPublicationComponent,
    EditPublicationComponent,
    PublicationDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    CoreModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
