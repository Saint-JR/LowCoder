import React, { FunctionComponent, MemoExoticComponent } from 'react';

import { RenderNode } from '../renderer/type';

export type RenderNodeHoc =
  | ((
      renderNode: RenderNode,
      ReactInstance: typeof React,
    ) => MemoExoticComponent<(props: any) => JSX.Element> | null)
  | null;

export type RenderSlotHoc =
  | ((ReactInstance: typeof React) => FunctionComponent<any> | null)
  | null;
