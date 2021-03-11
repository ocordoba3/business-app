import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Entry } from '../models/entry';
import { EntryService } from '../services/entry.service';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit, OnDestroy {

  entryForm: FormGroup;
  loading = false;
  loadingSubs: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private entryService: EntryService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loadingSubs = this.store.subscribe(state => {
      this.loading = state.ui.isLoading;
    });

    this.entryForm = this.formBuilder.group({
      description: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required]
    });
  }

  save() {
    if (this.entryForm.invalid) {
      return;
    }

    this.store.dispatch(uiActions.isLoading());

    const { description, value, type } = this.entryForm.value;
    const data = new Entry(description, value, type)

    this.entryService.createEntry(data)
      .then(() => {
        Swal.fire({
          title: 'Registro creado',
          text: description,
          confirmButtonText: 'Entendido',
          icon: 'success'
        });

        this.store.dispatch(uiActions.stopLoading());
        this.entryForm.reset();
      })
      .catch(err => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire({
          title: '¿Algo salió mal!',
          text: err.message,
          confirmButtonText: 'Entendido',
          icon: 'error'
        });
      });


  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
