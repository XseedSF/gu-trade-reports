
import React, { Component } from 'react';

export default class ImageAnswer extends Component {

	loadImage() {
		var myImage = new Image;
	    myImage.style.border = 'none';
	    myImage.style.outline = 'none';
	    myImage.style.position = 'fixed';
	    myImage.style.left = '0';
	    myImage.style.top = '0';
	    myImage.src = 'data:image/png;base64,' + this.props.question.ImageBase64;	   

		myImage.onload = function() {        
		      var newWindow = window.open("", "something","scrollbars=0, toolbar=0, width="+myImage.width+", height="+myImage.height);
		          newWindow.document.write(myImage.outerHTML);
		}
	}

	render() {		
		return (
			<button onClick={this.loadImage.bind(this)}>Ver Imagen</button> 
		)
	}

}





