import React from 'react';
import propTypes from 'prop-types';
import Viewer from './viewer';
import {Scrollbars} from 'react-custom-scrollbars';

const wrapStyle = {
	position: "relative",
	width: 800,
	height: 700,
	border: "2px solid #efefef",
	backgroundColor: 'floralwhite'
};

export default class JsonViewer extends React.Component {
	static propTypes = {
// 		json: propTypes.oneOfType([
// 			propTypes.string,
// 			propTypes.object
// 		]).isRequired,
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
		return <Viewer
			value={ json }
			rootActions={ this.passDownActions }
		/>
	};
	
	passDownActions = {
		updateScrollbar: () => {
			this.scrollbar.update();
		}
	};
	
	render() {
		const {rootStyle} = this.props;
		return <Scrollbars
			ref={ scrollbar => this.scrollbar = scrollbar }
			autoHide
			hideTracksWhenNotNeeded={ true }
			style={{...wrapStyle, ...rootStyle}}>
			{ this.renderViewer() }
		</Scrollbars>;
	}
}