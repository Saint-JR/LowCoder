import { Schema, SchemaNode, SchemaState } from './type';
import schema from '../mock/schema';
import { createStore, Action, Reducer, Store } from '../core/store';

// 初始状态
const initialState: SchemaState = {
  schema: null,
};

const schemaReducer: Reducer<SchemaState, Action> = (
  state = initialState,
  action,
): SchemaState => {
  switch (action.type) {
    case 'setSchema':
      return { ...state, schema: action.payload };
    default:
      return state;
  }
};

// 创建store实例
export const schemaStore: Store<SchemaState> = createStore(
  schemaReducer,
  initialState,
);

export const setSchema = (schemaPayload: Schema): Action<Schema> =>
  schemaStore.dispatch({
    type: 'setSchema',
    payload: schemaPayload,
  });

// 基础选择器
export const selectSchema = (state: SchemaState) => state.schema;

// 创建schema节点ID映射的选择器
export const selectSchemaNodeIdMap = (state: SchemaState) => {
  const schemaRootNode = state.schema?.content;
  const nodeMap: Map<string, SchemaNode> = new Map();

  if (!schemaRootNode) {
    return nodeMap;
  }

  const walkSchema = (schemaNode: SchemaNode | null) => {
    if (!schemaNode) {
      return;
    }
    nodeMap.set(schemaNode.id, schemaNode);
    Object.values(schemaNode.slot ?? {}).forEach((slot) =>
      slot.content.forEach(walkSchema),
    );
  };

  walkSchema(schemaRootNode);

  return nodeMap;
};

// 初始化mock数据（仅用于开发）
if (process.env.NODE_ENV !== 'production') {
  setSchema(schema);
}
