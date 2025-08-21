export enum NodeType {
  Slot = 'slot',
  Component = 'component',
}

export interface SelectedNode {
  id: string;
  nodeId: string;
  nodeType: NodeType;
  slotId?: string;
}
