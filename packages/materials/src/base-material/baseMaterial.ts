import { MemoExoticComponent, ReactNode } from "react";
import {
  Material,
  MaterialType,
  MaterialStyleVariable,
  MaterialAttribute,
  MaterialHook,
  MaterialSlot,
} from "../type";

export abstract class BaseMaterial implements Material {
  // 物料的唯一标识
  public abstract id: string;
  // 物料的标题
  public abstract title: string;
  // 物料的类型
  public abstract type: MaterialType;
  // 物料的样式变量
  public abstract styleVariable: Record<string, MaterialStyleVariable>;
  // 物料的属性
  public abstract attribute: Record<string, MaterialAttribute>;
  // 物料的钩子
  public abstract hook: Record<string, MaterialHook>;
  // 物料的组件
  public abstract content:
    | ReactNode
    | MemoExoticComponent<(props: any) => JSX.Element>;
  // 物料的插槽
  public abstract slot: Record<string, MaterialSlot> | null;
  // 只有该物料可以使用的子物料
  public abstract childMaterial?: Material[];
  // 不可用
  public disabled?: boolean = false;
  // 是否可以删除
  public canDelete?: boolean = true;

  public getConfig(): Material {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      styleVariable: this.styleVariable,
      attribute: this.attribute,
      hook: this.hook,
      content: this.content,
      slot: this.slot,
      childMaterial: this.childMaterial,
      disabled: this.disabled,
      canDelete: this.canDelete,
    };
  }
}
