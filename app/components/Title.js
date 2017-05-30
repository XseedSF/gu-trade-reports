import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => (
	<div className='nav_menu'>
		<div className='nav-form-name'>
		{children}
		</div>
	</div>
)

Title.propTypes = {
	children: PropTypes.element.isRequired,
}

export default Title;


