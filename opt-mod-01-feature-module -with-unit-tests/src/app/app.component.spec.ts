import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        SharedModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should call autologin & printLog onInit', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const authService = fixture.debugElement.injector.get(AuthService);
    const loggingService = fixture.debugElement.injector.get(LoggingService);
    let autoLoginIsCalled: boolean = false;
    spyOn(authService, 'autoLogin').and.callFake(() => {
      autoLoginIsCalled = true;
    });
    let spuiedPrintLog = spyOn(loggingService, 'printLog').and.callThrough();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(autoLoginIsCalled).toBeTruthy();
      expect(spuiedPrintLog).toHaveBeenCalledWith('[AppComponent]  - `ngOnInit` is fired.');
    });

  }));

  // it(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
