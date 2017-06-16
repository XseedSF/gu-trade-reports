import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import FlatButton from 'material-ui/FlatButton';
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download';

export default class ImageAnswer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			image: '',
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.loadImage = this.loadImage.bind(this);
	}

	loadImage() {
		const image = new Image();
		image.onload = () => {
			this.setState((prevState, props) => ({
				isOpen: true,
				image: image,
			}));
		}
		image.src = `data:image/png;base64, ${this.props.image}`;
	}

	handleOpen() {
		this.loadImage();
	};

	handleClose() {
		this.setState({ isOpen: false });
	};

	render() {
		return (
			<div>
				<RaisedButton label="Ver Imagen" onTouchTap={this.handleOpen} />
				{
					this.state.isOpen &&
					<ModalContainer onClose={this.handleClose}>
						<ModalDialog onClose={this.handleClose}>
							<img src={this.state.image.src} alt="imagen" />
							<a href={this.state.image.src} download><FileDownloadIcon /></a>
						</ModalDialog>
					</ModalContainer>
				}
			</div>
		);
	}
}