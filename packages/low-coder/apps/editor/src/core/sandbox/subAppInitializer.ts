import { autorun, IReactionDisposer } from 'mobx';

import cssContent from './index.css?raw';
import editorStore from '../store/editorStore';
import { NodeType, SelectedNode } from '../store/type';

class SubAppInitializer {
  private disposer: IReactionDisposer | undefined;
  private appWindow: Window | undefined;

  private selectNodeByClick = (event: MouseEvent) => {
    // 先暂时屏蔽鼠标事件继续冒泡
    event.preventDefault();
    event.stopPropagation();

    // 从子节点开始检查 防止slot无法被点击
    const target = ((event.target as HTMLElement)?.children?.[0] ??
      event.target) as HTMLElement;

    const walkNode = (target: HTMLElement | null) => {
      if (!target) {
        return null;
      }
      if (target.hasAttribute('low-coder-node')) {
        return target;
      }
      return walkNode(target.parentElement);
    };

    const lowCoderNode = walkNode(target);
    const nodeType = lowCoderNode?.getAttribute('low-coder-node-type');
    const nodeId = lowCoderNode?.getAttribute('low-coder-node-id');
    if (!nodeId || !nodeType) {
      return;
    }

    if (nodeType === 'slot') {
      const slotId = lowCoderNode?.getAttribute('low-coder-slot-id');
      if (!slotId) {
        return;
      }
      editorStore.selectNode({
        id: slotId,
        nodeType: NodeType.Slot,
        nodeId,
        slotId,
      });
      return;
    }
    editorStore.selectNode({
      id: nodeId,
      nodeType: NodeType.Component,
      nodeId,
    });
  };

  private selectParentNodeByDoubleClick = (event: MouseEvent) => {
    // 先暂时屏蔽
    event.preventDefault();
    event.stopPropagation();

    // 从子节点开始检查 防止slot无法被点击
    const target = ((event.target as HTMLElement)?.children?.[0] ??
      event.target) as HTMLElement;

    const walkNodeWithCondition = (
      condition: (node: HTMLElement) => boolean,
    ) => {
      const walkNode = (target: HTMLElement | null) => {
        if (!target) {
          return null;
        }
        if (condition(target)) {
          return target;
        }
        return walkNode(target.parentElement);
      };
      return walkNode;
    };

    // 被双击的已选中节点
    const selectedNode = walkNodeWithCondition((node) => {
      return node.hasAttribute('low-coder-node__is-selected');
    })(target);
    if (!selectedNode) {
      return;
    }

    // 选中节点的父节点
    const parentNode = walkNodeWithCondition((node) => {
      return node.hasAttribute('low-coder-node');
    })(selectedNode.parentElement);
    if (!parentNode) {
      return;
    }
    const nodeType = parentNode?.getAttribute('low-coder-node-type');
    const nodeId = parentNode?.getAttribute('low-coder-node-id');
    if (!nodeId || !nodeType) {
      return;
    }

    if (nodeType === 'slot') {
      const slotId = parentNode?.getAttribute('low-coder-slot-id');
      if (!slotId) {
        return;
      }
      editorStore.selectNode({
        id: slotId,
        nodeType: NodeType.Slot,
        nodeId,
        slotId,
      });
      return;
    }
    editorStore.selectNode({
      id: nodeId,
      nodeType: NodeType.Component,
      nodeId,
    });
  };

  private addSelectedElement() {
    if (!this.appWindow) {
      return;
    }
    const selectedNode = editorStore.selectedNode;
    if (!selectedNode?.id) {
      return;
    }
    this.appWindow.document
      .querySelectorAll(`[low-coder-id="${selectedNode.id}"]`)
      .forEach((selectedNodeElement) => {
        // 被选中的真实节点
        selectedNodeElement.setAttribute('low-coder-node__is-selected', 'true');

        const pseudoElement = (
          selectedNode.nodeType === NodeType.Slot
            ? selectedNodeElement.parentElement
            : selectedNodeElement.firstElementChild
        ) as HTMLElement;

        if (!pseudoElement) {
          return;
        }

        pseudoElement.classList.add('low-coder__is-selected');

        if (
          !pseudoElement.style.position ||
          pseudoElement.style.position === 'static'
        ) {
          pseudoElement.classList.add('low-coder__is-selected-relative');
        }
        // 被选中节点的展示边框的伪元素
        pseudoElement.setAttribute(
          'low-coder-node__is-selected-pseudo',
          'true',
        );
      });
  }

  private removeSelectedElement() {
    this.appWindow?.document
      .querySelectorAll('[low-coder-node__is-selected]')
      .forEach((element) => {
        element.removeAttribute('low-coder-node__is-selected');
      });

    this.appWindow?.document
      .querySelectorAll('[low-coder-node__is-selected-pseudo]')
      .forEach((element) => {
        element.classList.remove('low-coder__is-selected');
        element.classList.remove('low-coder__is-selected-relative');
        element.removeAttribute('low-coder-node__is-selected-pseudo');
      });
  }

  public setAppWindow(appWindow: Window) {
    this.appWindow = appWindow;
  }

  public selectElement(selectedNode: SelectedNode) {
    if (!this.appWindow || !selectedNode.id) {
      return;
    }

    this.removeSelectedElement();
    this.addSelectedElement();
  }

  public initSubApp() {
    if (!this.appWindow) {
      return;
    }

    // 直接插入CSS内容
    const cssStyle = this.appWindow.document.createElement('style');
    cssStyle.textContent = cssContent;
    this.appWindow.document.head.appendChild(cssStyle);

    // 点击事件
    this.appWindow.document.body.addEventListener(
      'click',
      this.selectNodeByClick,
      true,
    );

    // 双击事件
    this.appWindow.document.body.addEventListener(
      'dblclick',
      this.selectParentNodeByDoubleClick,
      true,
    );

    // 使用 autorun 响应状态变化
    this.disposer = autorun(() => {
      const selectedNode = editorStore.selectedNode;

      // 下一个队列再选中，避免此时页面还没有刷新
      setTimeout(() => {
        this.selectElement(selectedNode);
      }, 0);
    });
  }

  public destroySubApp() {
    if (!this.appWindow) {
      return;
    }

    this.appWindow.document.body.removeEventListener(
      'click',
      this.selectNodeByClick,
      true,
    );

    this.appWindow.document.body.removeEventListener(
      'dblclick',
      this.selectParentNodeByDoubleClick,
      true,
    );

    this.appWindow = undefined;

    if (this.disposer) {
      this.disposer();
      this.disposer = undefined;
    }
  }
}

const subAppInitializer = new SubAppInitializer();

const renderSelectedElement = () => {
  const selectedNode = editorStore.selectedNode;

  // 下一个队列再选中，避免此时页面还没有刷新
  setTimeout(() => {
    subAppInitializer.selectElement(selectedNode);
  }, 0);
};

export { renderSelectedElement };
export default subAppInitializer;
