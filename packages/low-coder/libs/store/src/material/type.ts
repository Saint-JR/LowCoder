import { Store } from '../core/store';
import { type Material as MaterialConfig } from '@low-coder/materials';

export * from '@low-coder/materials/type';

export type Material = MaterialConfig;

export interface MaterialState {
  materials: Material[];
}

export type MaterialStore = Store<MaterialState>;
