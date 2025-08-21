import { BaseMaterial } from "../base-material";
import { MaterialType } from "../type";
import RootContainerMaterial from "./rootContainer";

class RootContainer extends BaseMaterial {
  id = "root-container";
  title = "根容器";
  type = MaterialType.Container;
  styleVariable = {};
  attribute = {};
  hook = {};
  slot = {
    content: {
      name: "content",
      title: "内容",
    },
  };
  content = RootContainerMaterial;
  childMaterial = [];
  disabled = true;
}

const rootContainer = new RootContainer();

export { rootContainer, RootContainerMaterial };
