import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import Description from './Description';

const Header = ({ formName }) => (
	<div>
		<Title> Analizar: {formName} </Title>
		<Description />
	</div>
)

Header.propTypes = {
	formName: PropTypes.string.isRequired,
}

export default Header;