import { MemoExoticComponent, ReactNode } from "react";

export enum AttributeType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Enum = "enum",
  Object = "object",
  Array = "array",
}

export interface MaterialStyleVariable {
  name: string;
  title: string;
  defaultValue: string | null;
  type: string;
}

export interface MaterialAttribute {
  name: string;
  title: string;
  defaultValue: unknown | null;

  // 属性类型
  type: AttributeType;
  // 枚举
  enum?: {
    label: string;
    value: string;
  }[];

  // 属性分组
  group?: {
    title: string;
    name: string;
  };
}

export interface MaterialHook {
  name: string;
  title: string;
  defaultValue: string | null;
  // value: string | null;
}

export interface MaterialSlot {
  name: string;
  title: string;
  visible?: boolean;
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
  content: ReactNode | MemoExoticComponent<(props: any) => JSX.Element>;
  slot: Record<string, MaterialSlot> | null;
  // 只有该物料可以使用的子物料
  childMaterial?: Material[];
  // 不可用
  disabled?: boolean;
  // 是否可以删除
  canDelete?: boolean;
}
