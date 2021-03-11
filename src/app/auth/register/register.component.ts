import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as uiActions from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
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


    this.registroForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  createUser() {
    if( this.registroForm.invalid ) {
      return;
    }

    this.store.dispatch(uiActions.isLoading());
    const { name, email, password } = this.registroForm.value;

    this.authService.createUser(name, email, password)
      .then( () => {
        this.router.navigate(['/']);
        this.store.dispatch(uiActions.stopLoading());
      })
      .catch( err => {
        this.store.dispatch(uiActions.stopLoading());
        switch (err.code) {
          case 'auth/email-already-in-use':
            Swal.fire({
              title: 'Ups...',
              text: 'El correo ya está en uso por otro usuario.',
              icon: 'error'
            });    
            break;
        
          default:
            Swal.fire({
              title: 'Ups...',
              text: err.message,
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
