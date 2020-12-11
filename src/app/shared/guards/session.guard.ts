import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialAuthService } from 'angularx-social-login';
import { RouterPaths } from '../../core/routes';
import { UpdateSession } from '../../actions/session.actions';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SessionGuard implements CanActivate {

  constructor(private authService: SocialAuthService,
              private router: Router,
              private store: Store,
              private snackBar: MatSnackBar) {
  }

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.authState.pipe(map(user => {
      if (!user) {
        this.snackBar.open('Unauthorized, redirecting to login', '', { horizontalPosition: 'start', duration: 2000 });
        this.router.navigateByUrl(RouterPaths.home.asPath);
        return false;
      }
      this.store.dispatch(new UpdateSession(user));
      return true;
    }));
  }
}

