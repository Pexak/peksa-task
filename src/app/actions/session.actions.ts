import { SocialUser } from 'angularx-social-login';

export class UpdateSession {
  static readonly type = '[Session] Update Session';
  constructor(public payload: SocialUser) {}
}

export class ClearSession {
  static readonly type = '[Session] Clear Session';
  constructor() {}
}
