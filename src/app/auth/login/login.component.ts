import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as uiActions from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  uiSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.uiSubscription = this.store.subscribe(state => {
      this.loading = state.ui.isLoading;
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  logInUser() {

    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(uiActions.isLoading());
    const { email, password } = this.loginForm.value;

    this.authService.logInUser(email, password)
      .then(() => {
        this.router.navigate(['/']);
        this.store.dispatch(uiActions.stopLoading());
      })
      .catch(err => {
        this.store.dispatch(uiActions.stopLoading());

        switch (err.code) {
          
          case 'auth/user-not-found':
            Swal.fire({
              title: 'Ups...',
              text: 'Usuario no encontrado',
              icon: 'error'
            });
            break;

          default:
            Swal.fire({
              title: 'Ups...',
              text: 'Algo salió mal, vuelve a intentarlo.',
              icon: 'error'
            });
            break;
        }
      });

  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }


}
