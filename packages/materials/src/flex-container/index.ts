import { BaseMaterial } from "../base-material";
import { AttributeType, MaterialType } from "../type";
import FlexContainerMaterial from "./flexContainer";
class FlexContainer extends BaseMaterial {
  id = "flex-container";
  title = "Flex 容器";
  type = MaterialType.Container;
  styleVariable = {};
  attribute = {
    vertical: {
      name: "vertical",
      title: "垂直",
      defaultValue: false,
      type: AttributeType.Boolean,
      group: {
        title: "布局",
        name: "layout",
      },
    },
    justify: {
      name: "justify",
      title: "水平对齐",
      defaultValue: "normal",
      type: AttributeType.String,
      group: {
        title: "布局",
        name: "layout",
      },
    },
    align: {
      name: "align",
      title: "垂直对齐",
      defaultValue: "normal",
      type: AttributeType.String,
      group: {
        title: "布局",
        name: "layout",
      },
    },
    gap: {
      name: "gap",
      title: "间距",
      defaultValue: "",
      type: AttributeType.String,
      group: {
        title: "布局",
        name: "layout",
      },
    },
  };
  hook = {};
  slot = {
    content: {
      name: "content",
      title: "内容",
    },
  };
  content = FlexContainerMaterial;
  childMaterial = [];
}

const flexContainer = new FlexContainer();

export { flexContainer, FlexContainerMaterial };
