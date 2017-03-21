import React from 'react';
import ReactDOM from 'react-dom';
import App from './dist/app';

var initialData = document.getElementById('initial-data');
var form = JSON.parse(initialData.text);

ReactDOM.render(
  <App form={form}/>,
  document.getElementById('root')
);

initialData.remove(); 
