import React from 'react';
// @ts-ignore
import Reconciler from 'react-reconciler';
import { backgroundColorAssign } from './helpers';
import { ReconcilerFigmaHostConfig } from './typings';

const hostConfig: ReconcilerFigmaHostConfig = {};

export const render = (jsx: React.ReactNode, rootNode: ChildrenMixin) => {
    const reconciler = Reconciler(hostConfig);
    const container = reconciler.createContainer(rootNode);

    reconciler.updateContainer(jsx, container);
};
