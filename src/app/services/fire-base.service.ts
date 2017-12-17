import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

export const SINGINMAILPASS = 1;
export const SINGINGOOGLE = 2;
export const SINGINFACEBOOK = 3;
export const SINGINGITHUB = 4;

@Injectable()
export class FireBaseService {
  //FirebaseListObservable<any[]>;
  //FirebaseObjectObservable<any[]>;
  susbcribers = [];	
  private _AuthError:Subject<object> = new Subject<object>();
  public AuthError:Observable<object> = this._AuthError.asObservable();
  public AuthState:Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public afs:AngularFirestore) {
	this.AuthState = afAuth.authState;
  }
////////////////////////////////////////////////////////////////////////////////
  sigIn(tipo, mail?:string, pass?:string) {
    let swpopup;
    let res;

    switch(tipo){
      case 1: //mail/pass
        if (mail && pass)
          res = this.afAuth.auth.signInWithEmailAndPassword(mail, pass)
          .catch(error => {
            this._AuthError.next(error)
            console.log('ERROR @ AuthService#signInWithPassword() :', error);
          });
      break;
      case 2: //google
        swpopup = new firebase.auth.GoogleAuthProvider();
        break;
      case 3: //facebook
        swpopup = new firebase.auth.FacebookAuthProvider();
        break;
      case 4: //github
        swpopup = new firebase.auth.GithubAuthProvider();
        break;
      default:
        this.afAuth.auth.signInAnonymously();
    }
    if (swpopup)
      res = this.afAuth.auth.signInWithPopup(swpopup)
      .catch(error => {
            this._AuthError.next(error)
            console.log('ERROR @ AuthService#signInWithPopup() :', error);
          });

    return res;
  }

  signOut(ruta="/"): void {
    this.unsubscribe();
    this.afAuth.auth.signOut();
    //this.r.Jump(ruta);
  }

  signUp(mail:string, pass:string) {
	return this.afAuth.auth.createUserWithEmailAndPassword(mail, pass)
	  .catch(error => {
            this._AuthError.next(error)
            console.log('ERROR @ AuthService#createUserWithEmailAndPassword() :', error);
          });
  }

  passwordReset(mail:string) {
    return this.afAuth.auth.sendPasswordResetEmail(mail)
	  .catch(error => {
            this._AuthError.next(error)
            console.log('ERROR @ AuthService#sendPasswordResetEmail() :', error);
          });
  }
////////////////////////////////////////////////////////////////////////////////
  querys(method, valor?){
	
  }
  
  lista(dir:string, post?:string, query?:any):AngularFireList<any>{
  	let path = (post)? dir+'/'+post : dir;
    if (query)
      return this.db.list(path, query);
    return this.db.list(path);
  }

  objeto(dir:string, post?:string):AngularFireObject<any>{
  	let path = (post)? dir+'/'+post : dir;
  	return this.db.object(path);
  }
  
  docList(dir:string, post?:string): AngularFirestoreCollection<any>{
	let path = (post)? dir+'/'+post : dir;
  	return this.afs.collection<any>(path);
  }
  
  doc(dir:string, post?:string): AngularFirestoreDocument<any>{
	let path = (post)? dir+'/'+post : dir;
  	return this.afs.doc<any>(path);
  }

  unsubscribe(){
    for (let s of this.susbcribers)
      s.unsubscribe();

    this.susbcribers = [];
  }

  subscribe(s:any){
	   this.susbcribers.push(s);
  }
  
  listWithKey(l:AngularFireList<any>):Observable<any>{
	return l.snapshotChanges().map(lista => {
      return lista.map(elemeto => {
        const $key = elemeto.payload.key;
        const data = { $key, ...elemeto.payload.val()};
        return data;
      });
    });
  }
  
  objectWithKey(o:AngularFireObject<any>):Observable<any>{
	return o.snapshotChanges().map(elemeto => {
        const $key = elemeto.payload.key;
        const data = { $key, ...elemeto.payload.val()};
        return data;      
    });
  }

  docCollectionWithKey(d:AngularFirestoreCollection<any>):Observable<any>{
	return d.snapshotChanges().map(lista => {
      return lista.map(elemeto => {
        const $key = elemeto.payload.doc.id;
        const data = { $key, ...elemeto.payload.doc.data()};
        return data;
      });
    });
  }
  
  docWithKey(o:AngularFirestoreDocument<any>):Observable<any>{
	return o.snapshotChanges().map(elemeto => {
		if (elemeto.payload.exists)
		{
			const $key = elemeto.payload.id;
			const data = { $key, ...elemeto.payload.data()};
			return data;
		}
		return {};
    });
  }
////////////////////////////////////////////////////////////////////////////////
  upload(dir:string, file:string){
/*
	let uploadTask = this.fbapp.storage().ref().child(dir+'/'+file.filename   'images/image.png').put(file)
		.then((success) => { console.log(success); })	//'url' + uploadTask.snapshot.downloadURL); })
		.catch(error => console.log('Upload error :', error));

	return uploadTask;
*/
  }
////////////////////////////////////////////////////////////////////////////////
}
