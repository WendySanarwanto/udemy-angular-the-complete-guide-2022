import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

interface SignupResponse {
  idToken: string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId: string
} 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_BACKEND_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  API_KEY: string = environment.API_KEY;

  constructor(private http: HttpClient) { }

  async signUp(email: string, password: string) {
    let params = new HttpParams();
    params  = params.append('key', this.API_KEY);
    const observableResponse = 
      this.http.post<SignupResponse>(this.AUTH_BACKEND_URL, 
        { email, password, returnSecureToken: true }, { params});
    const response: SignupResponse = await lastValueFrom(observableResponse);
    console.log(response);
  }
}
