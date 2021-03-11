import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setItems } from '../entry/entry.actions';
import { EntryService } from '../services/entry.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  entrySubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(filter(auth => auth.user !== null))
      .subscribe(({ user }) => {
        this.entrySubs = this.entryService.initEntryListener(user.uid)
          .subscribe(entryItems => {
            this.store.dispatch(setItems({ items: entryItems }));
          });
      });
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
    this.entrySubs.unsubscribe();
  }

}
