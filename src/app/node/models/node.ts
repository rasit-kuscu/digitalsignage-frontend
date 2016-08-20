export class Node {
    expanded = false;
    checked = false;
    nodes:Array<Node> = [];

    constructor(public id: number, public name:string, public lastUpdate: any, public children: Array<Node>, public items: Array<string>) {
      if (children != null) {
        for (let node of children) {
          this.nodes.push(new Node(node['id'], node['name'], node['lastUpdate'], node['children'], null));
        }
      }
    }

    toggle() {
        this.expanded = !this.expanded;
    }

    getIcon() {
      if (this.expanded) {
        return '-';
      }
      return '+';
    }

    check() {
      this.checked = !this.checked;
      this.checkRecursive(this.checked);
    }

    checkRecursive(state: boolean) {
      this.nodes.forEach(d => {
        d.checked = state;
        d.checkRecursive(state);
      });
    }
}
