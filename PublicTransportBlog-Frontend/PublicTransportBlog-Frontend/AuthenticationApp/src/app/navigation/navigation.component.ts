import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  date = new Date;
  isExpanded: boolean = false;

  constructor(public authService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  onLogout() {
    this.authService.logout();
    this.toastr.success('Logged out', 'Success')
    this.router.navigate(['/']);
  }

  expandNav() {
    this.isExpanded = !this.isExpanded;
  }
}
