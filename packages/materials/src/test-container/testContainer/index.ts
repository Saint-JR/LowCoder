import TestContainerMaterial from "./testContainer";
import { MaterialType } from "../type";
import { BaseMaterial } from "../../base-material";

//   const config = {
//     id: "test-container",
//     title: "测试容器",
//     type: "container",
//     styleVariable: {},
//     attribute: {},
//     hook: {},
//     slot: {
//       header: {
//         name: "header",
//         title: "顶部",
//       },
//       footer: {
//         name: "footer",
//         title: "底部",
//       },
//     },
//     content: TestContainer,

//     children: [TestHeaderConfig, TestFooterConfig],
// };

class TestContainer extends BaseMaterial {
  id = "test-container";
  title = "测试容器";
  type = MaterialType.Container;
  styleVariable = {};
  attribute = {};
  hook = {};
  slot = {
    header: {
      name: "header",
      title: "顶部",
    },
    footer: {
      name: "footer",
      title: "底部",
    },
  };
  content = TestContainerMaterial;
  childMaterial = [];
}

const testContainer = new TestContainer();

export { testContainer, TestContainerMaterial };
