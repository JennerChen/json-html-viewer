import React from 'react';
import propTypes from 'prop-types';
import {blockValidator} from "./codeTypes";
import {KeyWordBlock, NumberBlock, StringBlock} from "./primitiveBlock";
import MapBlock from './mapBlock';
import ArrayBlock from './arrayBlock';
import warning from "../util/warning";

export default class Viewer extends React.Component {
	static propTypes = blockValidator;
	static defaultProps = {
		comma: false,
		breakLine: false,
		keyName: null,
		path: [],
	};
	
	render() {
		const {value} = this.props;
		if (value === null || typeof value === "boolean") {
			return <KeyWordBlock { ...this.props }/>
		} else if (typeof value === "number") {
			return <NumberBlock { ...this.props }/>
		} else if (typeof value === "string") {
			return <StringBlock { ...this.props }/>
		} else if (typeof value === "object") {
			return Array.isArray(value)
				? <ArrayBlock { ...this.props }/>
				: <MapBlock { ...this.props }/>
		}
		warning("json不存在的类型:" + typeof value);
		return null;
	}
}