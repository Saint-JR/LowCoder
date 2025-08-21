import { BaseMaterial } from "../base-material";
import { AttributeType, MaterialType } from "../type";
import TestButtonMaterial from "./testButton";

class TestButton extends BaseMaterial {
  id = "button";
  title = "按钮";
  type = MaterialType.Presentation;
  styleVariable = {};
  attribute = {
    content: {
      name: "content",
      title: "内容",
      defaultValue: "Button",
      type: AttributeType.String,
      group: {
        title: "内容",
        name: "content",
      },
    },
    size: {
      name: "size",
      title: "大小",
      defaultValue: "medium",
      type: AttributeType.Enum,
      enum: [
        {
          label: "小",
          value: "small",
        },
        {
          label: "中",
          value: "medium",
        },
        {
          label: "大",
          value: "large",
        },
      ],
    },
    shape: {
      name: "shape",
      title: "形状",
      defaultValue: "default",
      type: AttributeType.Enum,
      enum: [
        {
          label: "默认",
          value: "default",
        },
        {
          label: "圆角",
          value: "round",
        },
        {
          label: "圆形",
          value: "circle",
        },
      ],
    },
    color: {
      name: "color",
      title: "颜色",
      defaultValue: "default",
      type: AttributeType.Enum,
      enum: [
        {
          label: "默认",
          value: "default",
        },
        {
          label: "主要",
          value: "primary",
        },
        {
          label: "危险",
          value: "danger",
        },
        {
          label: "粉色",
          value: "pink",
        },
        {
          label: "紫色",
          value: "purple",
        },
      ],
    },
    variant: {
      name: "variant",
      title: "变体",
      defaultValue: "",
      type: AttributeType.Enum,
      enum: [
        {
          label: "默认",
          value: "",
        },
        {
          label: "边框",
          value: "outlined",
        },
        {
          label: "实心",
          value: "solid",
        },
        {
          label: "虚线",
          value: "dashed",
        },
        {
          label: "填充",
          value: "filled",
        },
        {
          label: "链接",
          value: "link",
        },
        {
          label: "文本",
          value: "text",
        },
      ],
    },
  };
  hook = {};
  slot = null;
  content = TestButtonMaterial;
  childMaterial = [];
}

const testButton = new TestButton();

export { testButton, TestButtonMaterial };
