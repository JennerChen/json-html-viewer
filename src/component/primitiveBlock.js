import React from 'react';
import {CodeBlock, JsonSymbol, KeyNameSpan, blockValidator, CodeSpan} from "./codeTypes";

export class StringBlock extends React.Component {
	static propTypes = blockValidator;
	static defaultProps = {
		comma: false,
		breakLine: false,
		keyName: null,
		value: '',
		path: []
	};
	
	render() {
		const {comma, breakLine, keyName, value} = this.props;
		return <CodeBlock className="string">
			<KeyNameSpan keyName={ keyName }/>
			<CodeSpan type="stringValue">"{ value }"</CodeSpan>
			<JsonSymbol value="," show={ comma }/>
			{ breakLine ? <br/> : ""}
		</CodeBlock>
	}
}

export class NumberBlock extends React.Component {
	static propTypes = blockValidator;
	static defaultProps = {
		comma: false,
		breakLine: false,
		keyName: null,
		path: []
	};
	
	render() {
		const {comma, breakLine, keyName, value} = this.props;
		return <CodeBlock className="number">
			<KeyNameSpan keyName={ keyName }/>
			<CodeSpan type="numberValue">{ value }</CodeSpan>
			<JsonSymbol value="," show={ comma }/>
			{ breakLine ? <br/> : ""}
		</CodeBlock>
	}
}

export class KeyWordBlock extends React.Component {
	static propTypes = blockValidator;
	static defaultProps = {
		comma: false,
		breakLine: false,
		keyName: null,
		path: []
	};
	
	render() {
		const {comma, breakLine, keyName, value} = this.props;
		return <CodeBlock className="keyword">
			<KeyNameSpan keyName={ keyName }/>
			<CodeSpan type="keyword">{ String(value) }</CodeSpan>
			<JsonSymbol value="," show={ comma }/>
			{ breakLine ? <br/> : ""}
		</CodeBlock>
	}
}