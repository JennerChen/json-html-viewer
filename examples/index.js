import JsonHtmlViewer from '../src/index';

import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
	<JsonHtmlViewer json={ JSON.stringify({
		"$schema": "http://json-schema.org/draft-04/schema#",
		"definitions": {},
		"id": "http://example.com/example.json",
		"properties": {
			"checked": {
				"id": "/properties/checked",
				"type": "boolean"
			},
			"id": {
				"id": "/properties/id",
				"type": "integer"
			},
			"name": {
				"id": "/properties/name",
				"type": "string"
			},
			"price": {
				"id": "/properties/price",
				"type": "number"
			},
			"tags": {
				"id": "/properties/tags",
				"items": {
					"id": "/properties/tags/items",
					"type": "string"
				},
				"type": "array"
			}
		},
		"array": [{
			"checked": {
				"id": "/properties/checked",
				"type": "boolean"
			}
		}, 2, 5, true, {}],
		"isSold": true,
		"type": "object"
	}) }/>, document.body.querySelector('#root')
);