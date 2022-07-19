import { HttpClient, HttpClientModule, HttpErrorResponse } from "@angular/common/http";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { Router, RouterModule } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { User } from "./user.model";

describe('Auth Service', () => {
  let authService: AuthService;
  let spiedHttp: jasmine.SpyObj<HttpClient>;
  let spiedRouter: jasmine.SpyObj<Router>

  beforeEach( async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterModule.forRoot([])
      ],
      providers: [
        AuthService,
        { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['post']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    });
    authService = TestBed.inject(AuthService);
    spiedHttp = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    spiedRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should sign up a new user', (done: DoneFn) => {
    const email: string = 'john.doe@gmail.com';
    const password: string = 'p4s5W0rD';

    const mockedPostResponse:AuthResponseData = {
      idToken: '123',
      email,
      refreshToken: '123',
      expiresIn: '3600',
      localId: '12345'
    };
    spiedHttp.post.and.returnValue(of(mockedPostResponse));

    authService.signup(email, password).subscribe((response: AuthResponseData) => {
      expect(response).toEqual(mockedPostResponse);
    });

    expect(spiedHttp.post).toHaveBeenCalled();

    authService.user.subscribe((user) => {
      expect(user).not.toBeNull();
      expect(user?.email).toEqual(mockedPostResponse.email);
      expect(user?.id).toEqual(mockedPostResponse.localId);
      expect(user?.token).toEqual(mockedPostResponse.idToken);
      const stringifiedUserData = localStorage.getItem('userData');
      expect(stringifiedUserData).not.toBeNull();
      expect(stringifiedUserData).toEqual(JSON.stringify(user));
      localStorage.removeItem('userData');
      done();
    });

  });

  it('should login authenticated user succesfully', (done: DoneFn) => {
    const email: string = 'john.doe@gmail.com';
    const password: string = 'p4s5W0rD';
    const mockedPostResponse:AuthResponseData = {
      idToken: '123',
      email,
      refreshToken: '123',
      expiresIn: '3600',
      localId: '12345'
    };

    spiedHttp.post.and.returnValue(of(mockedPostResponse));

    authService.login(email, password).subscribe((response: AuthResponseData) => {
      expect(response).toEqual(mockedPostResponse);
    });

    expect(spiedHttp.post).toHaveBeenCalled();

    authService.user.subscribe((user) => {
      expect(user).not.toBeNull();
      expect(user?.email).toEqual(mockedPostResponse.email);
      expect(user?.id).toEqual(mockedPostResponse.localId);
      expect(user?.token).toEqual(mockedPostResponse.idToken);
      const stringifiedUserData = localStorage.getItem('userData');
      expect(stringifiedUserData).not.toBeNull();
      expect(stringifiedUserData).toEqual(JSON.stringify(user));
      localStorage.removeItem('userData');
      done();
    });
  });

  it('should logout authenticated user successfully', (done: DoneFn) => {
    spiedRouter.navigate.and.callThrough();
    authService.logout();
    authService.user.subscribe((user: User | null) => {
      expect(user).toBeNull();
      expect(spiedRouter.navigate).toHaveBeenCalledWith(['/auth']);
      expect(localStorage.getItem('userData')).toBeNull();
      done();
    });
  });

  it('should autoLogout when expirationDuration reached zero', (done: DoneFn) => {
    const expirationDuration: number = 2000;
    const testWaitTime: number = 4000;

    spiedRouter.navigate.and.callThrough();

    authService.autoLogout(expirationDuration);
    setTimeout(() => {
      authService.user.subscribe((user: User | null) => {
        expect(user).toBeNull();
        expect(spiedRouter.navigate).toHaveBeenCalledWith(['/auth']);
        expect(localStorage.getItem('userData')).toBeNull();
        done();
      });
    }, testWaitTime);

  });

  it('should autologin authenticated user when the browser is refreshed', (done: DoneFn) => {
    // Login 1st
    const email: string = 'john.doe@gmail.com';
    const password: string = 'p4s5W0rD';
    const mockedPostResponse:AuthResponseData = {
      idToken: '123',
      email,
      refreshToken: '123',
      expiresIn: '3600',
      localId: '12345'
    };

    spiedHttp.post.and.returnValue(of(mockedPostResponse));

    authService.login(email, password).subscribe((response: AuthResponseData) => {
      expect(response).toEqual(mockedPostResponse);
    });

    expect(spiedHttp.post).toHaveBeenCalled();

    // Pretend the user refresh browser through hitting F5
    authService.autoLogin();
    authService.user.subscribe((user: User | null) => {
      expect(user).not.toBeNull();
      expect(user?.email).toEqual(mockedPostResponse.email);
      expect(user?.id).toEqual(mockedPostResponse.localId);
      expect(user?.token).toEqual(mockedPostResponse.idToken);
      const stringifiedUserData = localStorage.getItem('userData');
      expect(stringifiedUserData).not.toBeNull();
      expect(stringifiedUserData).toEqual(JSON.stringify(user));
      localStorage.removeItem('userData');
      done();
    });
  });

  it('should return error when signing up got unknown error', (done: DoneFn) => {
    const email: string = 'john.doe@gmail.com';
    const password: string = 'p4s5W0rD';
    // const unknownErrorMessage: string = "An unknown error occurred!";
    const errorRes: any = {
      error: null
    };
    const observableErrorResponse = of(errorRes);
    const httpErrorResponse: any = {
      error: null,
    };
    spyOn(observableErrorResponse, 'pipe').and.throwError(httpErrorResponse);
    spiedHttp.post.and.returnValue(observableErrorResponse);


    try {
      authService.signup(email, password);
    } catch(err) {
      expect(err).not.toBeNull();
    } finally {
      expect(spiedHttp.post).toHaveBeenCalled();
      done();
    }
  });
});
