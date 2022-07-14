import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router) { }

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
    const userData = new User(
      response.email,
      response.localId,
      response.idToken,
      new Date(new Date().getTime() + +response.expiresIn * 1000)
    )
    this.user.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  autoLogin() {
    const strUserData = localStorage.getItem('userData');
    if (!strUserData) {
      return;
    }
    const rawUserData: any = JSON.parse(strUserData);
    const userData: User = new User(
      rawUserData['email'],
      rawUserData['id'],
      rawUserData['_token'],
      rawUserData['_tokenExpirationDate']
    );
    if (userData.token) {
      this.user.next(userData);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }
}
