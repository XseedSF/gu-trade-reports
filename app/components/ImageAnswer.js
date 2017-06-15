import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const loadImage = (image) => {
	var myImage = new Image;
	myImage.style.border = 'none';
	myImage.style.outline = 'none';
	myImage.style.position = 'fixed';
	myImage.style.left = '0';
	myImage.style.top = '0';
	myImage.src = 'data:image/png;base64,' + image;

	myImage.onload = function () {
		var newWindow = window.open("", "something", "scrollbars=0, toolbar=0, width=" + myImage.width + ", height=" + myImage.height);
		newWindow.document.write(myImage.outerHTML);
	}
}

const ImageAnswer = ({ image }) =>
	<RaisedButton
		label="Ver Imagen"
		onTouchTap={() => loadImage(image)} />;

export default ImageAnswer;