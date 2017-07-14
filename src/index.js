import React from 'react';
import propTypes from 'prop-types';

import warning from "./util/warning";
const wrapStyle = {
	position: "relative",
	width: 800,
	height: 700,
	backgroundColor: '#fff',
	overflow: 'auto',
	padding: 25
};
class CodeBlock extends React.Component {
	render() {
		const {children, style, ...rest} = this.props;
		return <span {...rest } style={ {lineHeight: 20 + "px", fontSize: 14, ...style} }>
			{ children }
		</span>
	}
}

class CodeSpan extends React.Component {
	render() {
		const {children, style, type, ...rest} = this.props;
		return <span {...rest } style={ {lineHeight: 20 + "px", fontSize: 14, ...style} }>
			{ children }
		</span>
	}
}

//const CodeSpan = styled.span`
//	&:hover{
//		background-color:#efefef;
//	}
//	${ (props) => {
//	switch (props.type) {
//		case "keyname":
//			return "color:#92278f;font-weight:bold";
//			break;
//		case "keyword":
//			return "color:#f1592a;font-weight:bold";
//			break;
//		case "numberValue":
//			return "color:#25aae2;font-weight:bold";
//			break;
//		case "stringValue":
//			return "color:#3ab54a;font-weight:bold";
//			break;
//	}
//} };
//`;
class JsonSymbol extends React.PureComponent {
	static proptypes = {
		value: propTypes.oneOf([
			"}", "{", "[", "]", ",", ":"
		]).isRequired,
		show: propTypes.bool
	};
	
	static defaultProps = {
		value: ":",
		show: true
	};
	
	render() {
		const {show, value} = this.props;
		if (!show) {
			return null;
		}
		return <span style={ {
			fontSize: 16,
			color: '#333',
			padding: "0 2px"
		} }>
			{ value }
		</span>
	}
}

export default class JsonViewer extends React.Component {
	static propTypes = {
		json: propTypes.oneOfType([
			propTypes.array,
			propTypes.object
		]),
		rootStyle: propTypes.object
	};
	
	renderKeyName = ({
		                 key = null,
		                 path = []
	                 }) => {
		if (!key) return null;
		return [
			<CodeSpan type="keyname" key={ `json-${ path.join('-') }+keyname` }> "{key}" </CodeSpan>,
			<JsonSymbol value={ ":" } key={ `json-${ path.join('-') }+semi` }/>,
		]
	};
	
	renderString = ({comma = false, breakLine = false, key = null, value = '', path = []}) => {
		return <CodeBlock className="string" key={ "json-" + path.join("-") }>
			{ this.renderKeyName({
				key,
				path
			}) }
			<CodeSpan type="stringValue">"{ value }"</CodeSpan>
			<JsonSymbol value="," show={ comma }/>
			{ breakLine ? <br/> : ""}
		</CodeBlock>
	};
	
	renderNumber = ({comma = false, breakLine = false, key = null, value = '', path = []}) => {
		return <CodeBlock className="number" key={ "json-" + path.join("-") }>
			{ this.renderKeyName({
				key,
				path
			}) }
			<CodeSpan type="numberValue">{ value }</CodeSpan>
			<JsonSymbol value="," show={ comma }/>
			{ breakLine ? <br/> : ""}
		</CodeBlock>
	};
	
	renderKeyWordValue = ({comma = false, breakLine = false, key = null, value = '', path = []}) => {
		switch (value) {
			case null:
				value = "null";
				break;
			case true:
				value = "true";
				break;
			case false:
				value = "false";
				break;
		}
		return <CodeBlock className="keyword" key={ "json-" + path.join("-") }>
			{ this.renderKeyName({
				key,
				path
			}) }
			<CodeSpan type="keyword">{ value }</CodeSpan>
			<JsonSymbol value="," show={ comma }/>
			{ breakLine ? <br/> : ""}
		</CodeBlock>
	};
	
	renderArray = ({comma = false, breakLine = false, key = null, value = [], path = []}) => {
		
		return <CodeBlock key={ `json-${ path.join("-")}` } className="array">
			{ this.renderKeyName({
				key,
				path
			}) }
			<JsonSymbol value="[" key={ `${ path.join("-")}+start` }/>
			{
				value.map((v, i) => this.renderBaseOnType({
					comma: (value.length - 1) !== i,
					breakLine: false,
					value: v,
					path: [...path, i]
				}))
			}
			<JsonSymbol value="]" key={ `${ path.join("-")}+end` }/>
			<JsonSymbol value="," show={ comma } key={ `${ path.join("-")}+comma` }/>
			{ breakLine ? <br/> : ""}
		</CodeBlock>
	};
	
	renderMap = ({comma = false, breakLine = false, key = null, value = {}, path = []}) => {
		const codeKeys = Object.keys(value);
		return <CodeBlock key={ `json-${ path.join("-")}` } className="map">
			{ this.renderKeyName({
				key,
				path
			}) }
			<JsonSymbol value="{" key={ `${ path.join("-")}+start` }/>
			<br/>
			<div style={ {paddingLeft: 15} }>
				{
					codeKeys.map((k, i) => this.renderBaseOnType({
						comma: (codeKeys.length - 1) !== i,
						breakLine: (codeKeys.length - 1) !== i,
						value: value[k],
						key: k,
						path: [...path, k]
					}))
				}
			</div>
			<JsonSymbol value="}" key={ `${ path.join("-")}+end` }/>
			<JsonSymbol value="," show={ comma } key={ `${ path.join("-")}+comma` }/>
			{ breakLine ? <br/> : ""}
		</CodeBlock>
	};
	
	renderBaseOnType = ({comma = false, breakLine = false, key = null, value, path = []}) => {
		if (typeof value === "undefined") {
			warning("不是一个有效的json对象");
			return;
		}
		let fn = null;
		if (value === null || typeof value === "boolean") {
			fn = this.renderKeyWordValue;
		} else if (typeof value === "number") {
			fn = this.renderNumber
		} else if (typeof value === "string") {
			fn = this.renderString
		} else if (typeof value === "object") {
			fn = Array.isArray(value) ? this.renderArray : this.renderMap
		} else {
			return warning("不存在的类型:" + typeof value)
		}
		return fn({
			comma,
			breakLine,
			value,
			key,
			path
		})
	};
	
	render() {
		
		const {json, rootStyle} = this.props;
		
		return <div style={ {...wrapStyle, ...rootStyle} }>
			{ typeof json !== "undefined" ? this.renderBaseOnType({
				breakLine: true,
				value: json
			}) : null }
		</div>
	}
}