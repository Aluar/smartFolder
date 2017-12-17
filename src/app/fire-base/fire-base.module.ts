import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  imports: [
    CommonModule,
	AngularFireAuthModule,
	AngularFirestoreModule,
	AngularFireDatabaseModule,
  ],
  exports: [
	AngularFireAuthModule,
	AngularFirestoreModule,
	AngularFireDatabaseModule,  
  ],
  declarations: []
})
export class FireBaseModule { }
