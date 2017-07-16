import JsonHtmlViewer from '../src/index';

import React from 'react';
import ReactDom from 'react-dom';

import exampleJson from './jsons/small.json'
import exampleJson2 from './jsons/middle.json';
import exampleJson3 from './jsons/large.json';
console.time("render time");
ReactDom.render(
	<JsonHtmlViewer
		rootStyle={ {
			width:450
		}}
		json={ exampleJson }/>, document.body.querySelector('#root')
);
console.timeEnd("render time");
