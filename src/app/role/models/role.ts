import { Privilege } from './privilege';

export class Role {
  public id: number;
  public name: string;
  public privileges: any[];
  public isChecked: boolean = false;

  constructor(id: number, name: string, privileges: any[]) {
    this.id = id;
    this.name = name;
    this.privileges = privileges;
  }
}
