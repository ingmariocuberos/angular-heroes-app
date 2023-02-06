import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: User | undefined;

  get auth(): User{
    return { ...this._auth! } 
  }

  constructor( private http: HttpClient ) { }

  verificaAutenticacion(): Observable<boolean> | boolean {
    let { id } = JSON.parse(localStorage.getItem('user') || '{}');
    if(!id){
      return of(false);
    }

    return this.http.get<User>(`${this.baseUrl}usuarios/${id}`)
      .pipe(
        map(auth =>{
          console.log('map', auth);
          return true;
        })
    );

  }

  login( id:string = '1' ){
    return this.http.get<User>(`${this.baseUrl}usuarios/${id}`)
      .pipe(
        tap( auth => {
          this._auth = auth
          localStorage.setItem('user', JSON.stringify(auth));
        })
      );
  }

  logOut(){
    this._auth = undefined;
  }
}
