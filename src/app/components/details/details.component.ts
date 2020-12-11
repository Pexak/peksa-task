import { Component, OnInit } from '@angular/core';
import { SessionState } from '../../states/session.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ClearSession } from '../../actions/session.actions';
import { RouterPaths } from '../../core/routes';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {

  @Select(SessionState.getSession) socialUser$: Observable<SocialUser>;

  constructor(private authService: SocialAuthService, private router: Router, private store: Store, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.signOut().then(data => {
      this.snackBar.open('You\'ve logged out successfully!', '', { horizontalPosition: 'start', duration: 2000 });
      this.store.dispatch(new ClearSession());
      this.router.navigateByUrl(RouterPaths.home.asPath);
    });
  }

}
