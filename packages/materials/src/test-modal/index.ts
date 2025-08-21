import { BaseMaterial } from "../base-material";
import { MaterialType } from "../type";
import TestModalMaterial from "./testModal";

class TestModal extends BaseMaterial {
  id = "test-modal";
  title = "测试弹窗";
  type = MaterialType.Container;
  styleVariable = {};
  attribute = {};
  hook = {};
  slot = null;
  content = TestModalMaterial;
  childMaterial = [];
}

const testModal = new TestModal();

export { testModal, TestModalMaterial };
