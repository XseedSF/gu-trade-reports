import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { ModalContainer, ModalDialog } from "xs-react-modal-dialog";
import { IconButton } from "material-ui";
import Cancel from "material-ui/svg-icons/navigation/cancel";
import Spinner from "./Spinner";
import { COLORS } from "../constants";
import enhance from "../containers/ImageAnswerContainer";

class ImageAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      image: null
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const justFetchedImage = !prevProps.image && this.props.image;
    if (this.state.isShowingModal && justFetchedImage) {
      this.loadImage();
    }
  }

  fetchImage() {
    const { answerId } = this.props;
    this.props.fetchAnswerImage(answerId);
  }

  loadImage() {
    const image = new Image();
    image.onload = () => {
      this.setState({
        image: image
      });
    };
    image.src = `data:image/png;base64, ${this.props.image}`;
  }

  handleOpen() {
    this.setState({ isShowingModal: true });
    if (this.props.image) {
      this.loadImage();
    } else {
      this.fetchImage();
    }
  }

  handleClose() {
    this.setState({ isShowingModal: false });
  }

  render() {
    const cancelButton = (
      <IconButton
        style={{
          float: "right",
          marginRight: 20
        }}
        onClick={this.handleClose}
        iconStyle={{
          width: 40,
          height: 40,
          color: COLORS.OVER_MODAL
        }}
      >
        <Cancel />
      </IconButton>
    );

    const downloadButton = (
      <a
        style={{
          float: "right",
          marginTop: 12.3
        }}
        href={this.state.image ? this.state.image.src : ""}
        download
      >
        <svg width={40} height={40}>
          <circle cx={20} cy={20} r={16.5} fill="#4286f4" />
          <path
            d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
            transform="translate(8, 8)"
            fill="white"
          />
        </svg>
      </a>
    );

    return (
      <div>
        <RaisedButton label="Ver Imagen" onTouchTap={this.handleOpen} />
        {this.state.isShowingModal && (
          <ModalContainer>
            <div>
              {this.state.image ? (
                <ModalDialog>
                  <img
                    style={{ maxHeight: 500 }}
                    src={this.state.image.src}
                    alt="imagen"
                  />
                </ModalDialog>
              ) : (
                <Spinner color={COLORS.OVER_MODAL} />
              )}
              <div>
                {cancelButton}
                {this.state.image ? downloadButton : ""}
              </div>
            </div>
          </ModalContainer>
        )}
      </div>
    );
  }
}

export default enhance(ImageAnswer);
