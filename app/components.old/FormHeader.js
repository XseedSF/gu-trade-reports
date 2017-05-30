import React, { Component } from 'react';

export default class FormHeader extends Component {

	render() {

    	return (
    		<div className='nav_menu'>
    			<div className='nav-form-name'>
    			{this.props.children}
    			</div>
    		</div>
		)
    }
}