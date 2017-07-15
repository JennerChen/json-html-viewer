import React from 'react';
import propTypes from 'prop-types';

export const blockValidator = {
	comma: propTypes.bool,
	breakLine: propTypes.bool,
	keyName: propTypes.oneOfType([
		propTypes.string,
		propTypes.object
	]),
	value: propTypes.any.isRequired,
	path: propTypes.array.isRequired
};

export class CodeBlock extends React.Component {
	render() {
		const {children, style, ...rest} = this.props;
		return <span {...rest } style={ {lineHeight: 20 + "px", fontSize: 14, ...style} }>
			{ children }
		</span>
	}
}

export class CodeSpan extends React.Component {
	render() {
		let {children, style, type, ...rest} = this.props;
		switch (type) {
			case "keyname":
				style = Object.assign({}, style, {
					color: '#92278f',
					fontWeight: 'bold'
				});
				break;
			case "keyword":
				style = Object.assign({}, style, {
					color: '#f1592a',
					fontWeight: 'bold'
				});
				break;
			case "numberValue":
				style = Object.assign({}, style, {
					color: '#25aae2',
					fontWeight: 'bold'
				});
				break;
			case "stringValue":
				style = Object.assign({}, style, {
					color: '#3ab54a',
					fontWeight: 'bold'
				});
				break;
		}
		
		return <span {...rest } style={ {lineHeight: 20 + "px", fontSize: 14, ...style} }>
			{ children }
		</span>
	}
}

export class JsonSymbol extends React.PureComponent {
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

export class CollapseIcon extends React.Component {
	
	static propTypes = {
		collapse: propTypes.bool.isRequired,
		onclick: propTypes.func
	};
	
	static defaultProps = {
		collapse: false,
		onclick: () => {
		}
	};
	
	constructor(props) {
		super(props);
		this.state = {
			collapse: this.props.collapse
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.collapse !== this.props.collapse) {
			this.setState({
				collapse: nextProps.collapse
			})
		}
	}
	
	render() {
		const {onclick} = this.props;
		const {collapse} = this.state;
		return <img
			onClick={ () => {
				this.setState({
					collapse: !collapse
				});
				onclick(!collapse);
			} }
			src={ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAABDElEQVQ4T7WUzXGDMBCF9x3QNSnBHaSEOBU4LbiDcJA4xj4iDqSDtBBXECjBHbiE5CoOL7MeM4Nt4SGAd0bDHpb3aX+0kDsb+vTzPN8AeB7CB1BZa7ex2CjgJP4+RLyNIbnNsmxz+U8U4L2vRERvX5NUv9cALNtY55z6Z3YT0HerrkIn23oUwBjz0TTNUyyFJEn2IYQ3AFrOcQAABxH57KnRmuRiEkAb573/EpHVBWTnnHudXCIFlGX5GEI4AHhQCMlfY8wiTdOfWQAqWhTFkuS3+gBerLXH6ZoN0IrptzvvswJijZ4EEJFK18Cth0ZSH5ee4WN691XRad7V049lo+sktoeOA/GfhTYm9g9TersRS1T8XAAAAABJRU5ErkJggg=="}
			style={ {
				position: 'relative',
				top: 2,
				transition: 'transform .3s',
				transform: `rotate(${ collapse ? -180 : 0  }deg)`,
				cursor: 'pointer',
				width: 20
			} }
		/>
	}
}
export class KeyNameSpan extends React.Component {
	static propTypes = {
		keyName: propTypes.oneOfType([
			propTypes.string,
			propTypes.object
		])
	};
	
	render() {
		const {keyName} = this.props;
		if (keyName === null) {
			return null;
		}
		return <span>
			<CodeSpan type="keyname"> "{keyName}" </CodeSpan>
			<JsonSymbol value={ ":" }/>
		</span>
	}
}
