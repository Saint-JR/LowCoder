export interface MaterialStyleVariable {
  name: string;
  title: string;
  defaultValue: string | null;
  value: string | null;
}

export interface MaterialAttribute {
  name: string;
  title: string;
  defaultValue: unknown | null;
  value: unknown | null;
}

export interface MaterialHook {
  name: string;
  title: string;
  defaultValue: string | null;
  value: string | null;
}

export interface MaterialSlot {
  name: string;
  title: string;
  limit?: unknown;
}

export enum MaterialType {
  Container = "container",
  Presentation = "presentation",
}

export interface Material {
  id: string;
  title: string;
  type: MaterialType;
  styleVariable: Record<string, MaterialStyleVariable>;
  attribute: Record<string, MaterialAttribute>;
  hook: Record<string, MaterialHook>;
  content: unknown;
  slot: Record<string, MaterialSlot>;

  // 只有该物料可以使用的子物料
  children?: Material[];
}
