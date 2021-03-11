import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {

    Swal.fire({
      title: 'Saliendo...',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.authService.logOut()
      .then(() => {
        setTimeout(() => {
          this.router.navigate(['/login']);
          Swal.close();
        }, 500);
      });

  }

}
