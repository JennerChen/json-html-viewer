import React from 'react';
import propTypes from 'prop-types';
import {CodeBlock, JsonSymbol, KeyNameSpan, blockValidator, CollapseIcon} from "./codeTypes";
import Viewer from './viewer';

export default class MapBlock extends React.Component {
	static propTypes = blockValidator;
	static defaultProps = {
		comma: false,
		breakLine: false,
		keyName: null,
		value: {},
		path: []
	};
	
	state = {
		collapse: false
	};
	
	
	renderContent = () => {
		const {value, path} = this.props;
		const codeKeys = Object.keys(value);
		if (codeKeys.length === 0) {
			return null
		}
		
		if (this.state.collapse) {
			return <span style={ {userSelect: 'none'} }>...</span>
		}
		
		return <div style={ {paddingLeft: 15} }>
			{
				codeKeys.map((k, i) => <Viewer
					key={ `json-${ path.join('-') }-${ k }` }
					comma={(codeKeys.length - 1) !== i}
					breakLine={ (codeKeys.length - 1) !== i }
					value={ value[k] }
					keyName={ k }
					path={ [...path, k] }
				/>)
			}
		</div>
	};
	
	renderCollapseIcon = () => {
		const {keyName, value} = this.props;
		const {collapse} = this.state;
		if (!keyName) return null;
		if (Object.keys(value).length === 0) return null;
		return <CollapseIcon
			onclick={ () => this.setState({
				collapse: !collapse
			})}
			collapse={ collapse }/>;
	};
	
	
	render() {
		const {comma, breakLine, keyName, value, path} = this.props;
		return <CodeBlock className="map">
			<KeyNameSpan keyName={ keyName }/>
			{ this.renderCollapseIcon()}
			
			
			<JsonSymbol value="{" key={ `start` }/>
			{ this.renderContent() }
			<JsonSymbol value="}" key={ `end` }/>
			<JsonSymbol value="," show={ comma } key={ `comma` }/>
			{ breakLine ? <br/> : ""}
		</CodeBlock>
	}
}