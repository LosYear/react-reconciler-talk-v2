import React from 'react';

import render from './renderer';

import './styles.css';

import InitialRenderExample from './examples/InitialRenderExample';
import PropChangeExample from './examples/PropChangeExample';
import InsertExample from './examples/InsertExample';
import RemoveExample from './examples/RemoveExample';
import TextUpdateExample from './examples/TextUpdateExample';

const rootContainer = document.querySelector('#root');

// render(<InitialRenderExample />, rootContainer);
render(<PropChangeExample />, rootContainer);
// render(<InsertExample />, rootContainer);
// render(<RemoveExample />, rootContainer);
// render(<TextUpdateExample />, rootContainer);
