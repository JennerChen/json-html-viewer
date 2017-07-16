import React from 'react';
import propTypes from 'prop-types';
import {CodeBlock, JsonSymbol, KeyNameSpan, blockValidator} from "./codeTypes";
import Viewer from './viewer';
export default class ArrayBlock extends React.Component {
	static propTypes = blockValidator;
	static defaultProps = {
		comma: false,
		breakLine: false,
		keyName: null,
		path: []
	};
	
	render() {
		const {comma, breakLine, keyName, value, path, rootActions} = this.props;
		return <CodeBlock className="array">
			<KeyNameSpan keyName={ keyName }/>
			<JsonSymbol value="[" key={ `start` }/>
			{
				value.map((v, i) => <Viewer
					key={ `json-${ path.join('-') }-${ i }` }
					comma={ (value.length - 1) !== i }
					breakLine={ false }
					value={ v }
					path={ [...path, i] }
					rootActions={rootActions}
				/>)
			}
			<JsonSymbol value="]" key={ `end` }/>
			<JsonSymbol value="," show={ comma } key={ `comma` }/>
			{ breakLine ? <br/> : ""}
		</CodeBlock>
	}
}