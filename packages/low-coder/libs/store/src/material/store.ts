import { Material, MaterialState } from './type';
import materials from '../mock/material';
import { Action, createStore } from '../core/store';

// 初始状态
const initialState: MaterialState = {
  materials: [],
};

// 仓库实例
export const materialStore = createStore(
  (state: MaterialState, action: Action) => {
    switch (action.type) {
      case 'setMaterials':
        return {
          ...state,
          materials: action.payload,
        };
      default:
        return state;
    }
  },
  initialState,
);

export const selectMaterials = (state: MaterialState) => state.materials;
export const selectMaterialIdMap = (state: MaterialState) => {
  const map = new Map<string, Material>();
  state.materials.forEach((material) => {
    map.set(material.id, material);
  });
  return map;
};

// 导出action创建函数
export const setMaterials = (materials: Material[]) =>
  materialStore.dispatch({
    type: 'setMaterials',
    payload: materials,
  });

// 初始化mock数据（仅用于开发）
if (process.env.NODE_ENV !== 'production') {
  setMaterials(materials);
}
