import React from 'react';
import InitialRenderExample from './examples/InitialRenderExample';
import PropChangeExample from './examples/PropChangeExample';
import InsertRemoveExample from './examples/InsertRemoveExample';
import { render } from './renderer';

(async () => {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });

    // render(<InitialRenderExample />, figma.currentPage);
    render(<PropChangeExample />, figma.currentPage);
    // render(<InsertRemoveExample />, figma.currentPage);
})();
