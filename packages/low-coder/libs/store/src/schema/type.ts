import { Store } from '../core/store';
export interface SchemaNode {
  id: string;
  name: string;
  title: string;
  material: string;
  style: Record<string, string>;
  attribute: Record<string, unknown>;
  hook: Record<string, string>;
  slot: Record<string, SlotNode> | null;
}

export interface SlotNode {
  id: string;
  name: string;
  title: string;
  visible?: boolean;
  limit?: unknown;
  content: SchemaNode[];
}

export interface Request {
  id: string;
  title: string;
  content: string;
  prop: string;
}

export interface Variable {
  name: string;
  type: string;
  defaultValue: unknown;
}

export interface Schema {
  id: string;
  title: string;
  creator: string;
  createTime: string;
  materials: string[];
  requests: Request[];
  globalVariables: Variable[];
  content: SchemaNode;
}

export interface SchemaState {
  schema: Schema | null;
}

export type SchemaStore = Store<SchemaState>;
