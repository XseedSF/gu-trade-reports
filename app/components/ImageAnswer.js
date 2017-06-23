import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { ModalContainer, ModalDialog } from "xs-react-modal-dialog";
import FlatButton from "material-ui/FlatButton";
import FileDownloadIcon from "material-ui/svg-icons/file/file-download";

export default class ImageAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      image: ""
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
        image: image
      }));
    };
    image.src = `data:image/png;base64, ${this.props.image}`;
  }

  handleOpen() {
    this.loadImage();
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const buttons = [
      <a
        key="download-button"
        className="modal-download-button"
        onClick={this.handleDownload}
        href={this.state.image.src}
        download
      >
        <svg width={40} height={40}>
          <circle cx={20} cy={20} r={20} fill="#4286f4" />
          <path
            d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
            transform="translate(8, 8)"
            fill="white"
          />
        </svg>
      </a>
    ];

    return (
      <div>
        <RaisedButton label="Ver Imagen" onTouchTap={this.handleOpen} />
        {this.state.isOpen &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose} buttons={buttons}>
              <img src={this.state.image.src} alt="imagen" />
            </ModalDialog>
          </ModalContainer>}
      </div>
    );
  }
}
