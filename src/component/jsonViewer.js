import React from 'react';
import propTypes from 'prop-types';
import Viewer from './viewer';

const wrapStyle = {
	position: "relative",
	width: 800,
	height: 700,
	overflow: 'auto',
	border: "2px solid #efefef",
	backgroundColor: 'floralwhite'
};

export default class JsonViewer extends React.Component {
	static propTypes = {
		json: propTypes.oneOfType([
			propTypes.string,
			propTypes.object
		]).isRequired,
		rootStyle: propTypes.object
	};
	
	renderViewer = () => {
		let {json} = this.props;
		if (typeof json === "undefined") {
			return <span> invalid json data  </span>
		}
		
		if (typeof json === "string") {
			try {
				json = JSON.parse(json)
			} catch (e) {
				return <div> invalid json data </div>
			}
		}
		return <Viewer value={ json }/>
	};
	
	render() {
		const {rootStyle} = this.props;
		return <div style={ {...wrapStyle, ...rootStyle} }>
			{ this.renderViewer() }
		</div>
	}
}