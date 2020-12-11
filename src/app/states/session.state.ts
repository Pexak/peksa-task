import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SocialUser } from 'angularx-social-login';
import { ClearSession, UpdateSession } from '../actions/session.actions';

export class SessionStateModel {
  socialUser: SocialUser;
}

@State<SessionStateModel>({
  name: 'session',
  defaults: {
    socialUser: null,
  }
})

export class SessionState {

  constructor() {
  }

  @Selector()
  static getSession(state: SessionStateModel): SocialUser {
    return state.socialUser;
  }

  @Action(UpdateSession)
  updateSession({ getState, setState }: StateContext<SessionStateModel>, { payload }: UpdateSession): void {
    setState({ socialUser: payload });
  }

  @Action(ClearSession)
  clearSession({ getState, setState }: StateContext<SessionStateModel>): void {
    setState({ socialUser: null });
  }

}
