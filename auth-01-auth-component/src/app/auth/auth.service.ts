import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';

interface SignupResponse {
  idToken: string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId: string
} 

export interface SignInResponse extends SignupResponse {
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  SIGNUP_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  LOGIN_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  API_KEY: string = environment.API_KEY;
  user = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient) { }

  async signUp(email: string, password: string) {
    let params = new HttpParams();
    params  = params.append('key', this.API_KEY);
    const observableResponse = 
      this.http.post<SignupResponse>(this.SIGNUP_URL, 
        { email, password, returnSecureToken: true }, { params});
    const response: SignupResponse = await lastValueFrom(observableResponse);
    console.log(response);
  }

  async login(email: string, password: string) {
    let params = new HttpParams();
    params  = params.append('key', this.API_KEY);
    const observableResponse = 
      this.http.post<SignInResponse>(this.LOGIN_URL, 
        { email, password, returnSecureToken: true }, { params });
    const response: SignInResponse = await lastValueFrom(observableResponse);
    console.log(response);
    this.user.next(new User(
      response.email,
      response.localId,
      response.idToken,
      new Date(new Date().getTime() + +response.expiresIn * 1000)
    ));
  }
}
