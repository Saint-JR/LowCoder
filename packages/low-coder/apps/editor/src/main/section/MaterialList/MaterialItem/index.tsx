import {
  getNodePosition,
  useMaterialStore,
  useSchemaStore,
  useSelector,
} from '@low-coder/low-coder-shared';
import { selectMaterialIdMap } from '@low-coder/low-coder-store';
import { Button } from 'antd';
import { memo, useMemo, useState } from 'react';

import { NodeType } from '../../../../core/store/type';
import { createNode } from '../../../../shared/createNode';
import { schemaOperator } from '../../../../shared/schemaOperator';
import { useEditorStore } from '../../../../shared/useEditorStore';

interface MaterialItemProps {
  materialId: string;
}

const MaterialItem = memo((props: MaterialItemProps) => {
  const { materialId } = props;

  const editorStore = useEditorStore();
  const materialStore = useMaterialStore();
  const schemaStore = useSchemaStore();

  const materialIdMap = useSelector(selectMaterialIdMap, materialStore);
  const material = useMemo(
    () => materialIdMap.get(materialId),
    [materialIdMap, materialId],
  );

  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  const handleAdd = () => {
    const { selectedNode } = editorStore;
    const { schema } = schemaStore.getState();

    if (!selectedNode || !schema || !material) {
      return;
    }

    const nodePosition = getNodePosition(
      schema,
      selectedNode.nodeType === NodeType.Slot
        ? selectedNode.slotId!
        : selectedNode.nodeId,
    );

    if (!nodePosition) {
      return;
    }

    if (selectedNode.nodeType === NodeType.Slot) {
      schemaOperator.addNode(createNode(material), nodePosition);
    } else {
      schemaOperator.replaceNode(createNode(material), nodePosition);
    }
  };

  if (!material) {
    return null;
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="border border-solid border-gray-100 rounded-[8px] p-2 shadow-sm relative"
    >
      <span className="text-sm text-gray-600">{material.title}</span>

      {show && (
        <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center">
          <Button type="primary" size="small" onClick={handleAdd}>
            添加
          </Button>
        </div>
      )}
    </div>
  );
});

export default MaterialItem;
