export class Group {
  public id: number;
  public name: string;
  public isChecked: boolean = false;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
