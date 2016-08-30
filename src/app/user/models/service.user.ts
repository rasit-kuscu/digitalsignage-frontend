export class ServiceUser {
  username: string;
  password: string;
  enabled: boolean;

  constructor(
    username: string,
    password: string,
    enabled: boolean) {
      this.username = username;
      this.password = password;
      this.enabled = enabled;
  }
}
