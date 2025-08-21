import {
  getNode,
  useMaterialStore,
  useSchemaStore,
  useSelector,
} from '@low-coder/low-coder-shared';
import {
  SchemaNode,
  selectMaterials,
  selectSchema,
} from '@low-coder/low-coder-store';
import { observer } from 'mobx-react';
import { useMemo } from 'react';

import AttributeGroup from './AttributeGroup';
import AttributeItem from './AttributeItem';
import { AttributeItem as AttributeItemType } from './type';
import { schemaOperator } from '../../../../shared/schemaOperator';
import { useEditorStore } from '../../../../shared/useEditorStore';

const AttributePanel = observer(() => {
  const { selectedNode } = useEditorStore();
  const materialStore = useMaterialStore();
  const schemaStore = useSchemaStore();

  const schema = useSelector(selectSchema, schemaStore);
  const materials = useSelector(selectMaterials, materialStore);

  const selectedSchemaNode = useMemo(() => {
    if (!selectedNode || !schema) {
      return null;
    }

    return getNode(schema, selectedNode.id) as SchemaNode;
  }, [schema, selectedNode]);

  const selectedNodeMaterial = useMemo(() => {
    if (!materials || !selectedSchemaNode) {
      return null;
    }

    return materials.find(
      (material) => material.id === selectedSchemaNode?.material,
    );
  }, [materials, selectedSchemaNode]);

  const attributeGroupList = useMemo(() => {
    if (!selectedNodeMaterial || !selectedSchemaNode) {
      return null;
    }

    return Object.values(selectedNodeMaterial.attribute).reduce(
      (acc, attribute) => {
        const group = attribute?.group?.name ?? '';
        if (Reflect.has(acc, group)) {
          acc[group].push({
            ...attribute,
            value: selectedSchemaNode.attribute?.[attribute.name],
          });
        } else {
          acc[group] = [
            {
              ...attribute,
              value: selectedSchemaNode.attribute?.[attribute.name],
            },
          ];
        }

        return acc;
      },
      {} as Record<string, AttributeItemType[]>,
    );
  }, [selectedNodeMaterial, selectedSchemaNode]);

  const groupNameMap = useMemo(() => {
    if (!selectedNodeMaterial) {
      return {};
    }

    return Object.values(selectedNodeMaterial.attribute).reduce(
      (acc, attribute) => {
        if (attribute.group?.name) {
          acc[attribute.group.name] = attribute.group.title;
        }
        return acc;
      },
      {
        '': '基础',
      } as Record<string, string>,
    );
  }, [selectedNodeMaterial]);

  const handleAttributeChange = (attribute: AttributeItemType) => {
    if (!selectedSchemaNode) {
      return;
    }

    selectedSchemaNode.attribute[attribute.name] = attribute.value;
    schemaOperator.refreshSchema();
  };

  return (
    <div className="w-full h-full" key={selectedNode?.id}>
      {attributeGroupList &&
        Object.entries(attributeGroupList).map(([group, attributes]) => (
          <AttributeGroup key={group} group={groupNameMap[group]}>
            {attributes.map((attribute) => (
              <AttributeItem
                key={attribute.name}
                attribute={attribute}
                onChange={handleAttributeChange}
              />
            ))}
          </AttributeGroup>
        ))}
    </div>
  );
});

export default AttributePanel;
