import { LoginAttempt } from './login.attempt';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  defaultGroupId: number;
  groups: any[];
  roles: any[];
  accountNonLocked: boolean;
  loginAttempt: LoginAttempt;

  constructor(id: number,
    username: string,
    email: string,
    password: string,
    groups: any[],
    roles: any[],
    accountNonLocked: boolean) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.groups = groups;
      this.roles = roles;
      this.accountNonLocked = accountNonLocked;
  }
}
