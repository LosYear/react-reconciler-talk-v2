import React from 'react';
// @ts-ignore
import Reconciler from 'react-reconciler';
import { isImgElement, ReconcilerDOMHostConfig } from './typings';

const hostConfig: ReconcilerDOMHostConfig = {};

const render = (jsx: React.ReactNode, root: Element | null) => {
    if (!root) {
        return;
    }

    const reconciler = Reconciler(hostConfig);
    const container = reconciler.createContainer(root, false, false);

    reconciler.updateContainer(jsx, container);
};

export default render;
