import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entry } from '../models/entry';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
    ) { }

  createEntry(entry: Entry) {

    return this.firestore.doc(`${this.authService.user.uid}/entry`)
                  .collection('items')
                  .add({...entry});
  }

  initEntryListener(uid: string) {
    return this.firestore.collection((`${uid}/entry/items`))
                         .snapshotChanges()
                         .pipe(
                           map( snapshot => snapshot.map( doc => ({
                                 id: doc.payload.doc.id,
                                 ...doc.payload.doc.data() as any
                               })
                             )
                           )
                         );
  }

  deleteEntry(itemId: string) {
    return this.firestore.doc(`${this.authService.user.uid}/entry/items/${itemId}`).delete();
  }
}
