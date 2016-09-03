export class NodeConst {
    public id: number;
    public name: string;
    public type: string;
    public parentNode: NodeConst;
    public lastUpdate: any;

    constructor(id: number, name: string, type: string, parentNode: NodeConst, lastUpdate: any) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.parentNode = parentNode;
        this.lastUpdate = lastUpdate;
    }
}
