import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Entry } from 'src/app/models/entry';
import { EntryService } from 'src/app/services/entry.service';
import * as uiActions from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  entries: Entry[];
  loading: boolean;
  entrySubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private entryService: EntryService
  ) { }

  ngOnInit(): void {

    // this.store.dispatch(uiActions.isLoading());

    this.entrySubs = this.store.subscribe(state => {
      this.loading = state.ui.isLoading;
      this.entries = state.entry.items;
      // this.store.dispatch(uiActions.stopLoading());
    });
  }

  deleteItem(item: any) {
    this.entryService.deleteEntry(item.id)
      .then( () => {
        Swal.fire({
          title: item.description,
          text: 'Ha sido eliminado',
          confirmButtonText: 'Entendido',
          icon: 'success'
        });
      })
      .catch( err => {
        Swal.fire({
          title: 'Error',
          text: err.message,
          confirmButtonText: 'Entendido',
          icon: 'error'
        });
      })
    console.log(item.id);
  }

  ngOnDestroy() {
    this.entrySubs.unsubscribe();
  }

}
