import { makeAutoObservable } from 'mobx';

import { NodeType, SelectedNode } from './type';

class EditorStore {
  public selectedNode: SelectedNode = {
    id: '',
    nodeId: '',
    nodeType: NodeType.Component,
  };

  constructor() {
    makeAutoObservable(this);
  }

  public selectNode(nextSelectedNode: SelectedNode | null) {
    if (!nextSelectedNode) {
      this.selectedNode = {
        id: '',
        nodeId: '',
        nodeType: NodeType.Component,
      };
    } else {
      this.selectedNode = {
        ...nextSelectedNode,
      };
    }
  }
}

const editorStore = new EditorStore();
export default editorStore;
