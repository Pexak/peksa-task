import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterPaths } from '../../core/routes';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UpdateSession } from '../../actions/session.actions';

const googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private authService: SocialAuthService,
              private router: Router,
              private matIconRegistry: MatIconRegistry,
              private store: Store,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('logo', this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  ngOnInit(): void {
  }

  public googleLogin(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.store.dispatch(new UpdateSession(data));
      this.router.navigateByUrl(RouterPaths.details.asPath);
    });
  }

}
