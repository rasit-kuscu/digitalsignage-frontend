import { Group } from '../../group/models/group';

export class MyProfile {
  public username: string;
  public email: string;
  public password: string;
  public group:Group;
  public groups: string[];
}
