import { NodeConst } from './node.const';

export class Item {
    public id: number;
    public name: string;
    public parentNode: NodeConst;
    public updatedAt: any;

    constructor(id: number, name: string, parentNode: NodeConst, updatedAt: any) {
        this.id = id;
        this.name = name;
        this.parentNode = parentNode;
        this.updatedAt = updatedAt;
    }
}
