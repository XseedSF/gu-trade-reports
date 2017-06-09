import React from 'react';
import PropTypes from 'prop-types';
import { HeaderContainer } from '../containers';
import Title from './Title';
import Description from './Description';
import { compose, setPropTypes } from 'recompose';

const Header = ({ formName }) => (
	<div>
		<Title> Analizar: {formName} </Title>
		<Description />
	</div>
)

const enhance = compose(
	HeaderContainer,
	setPropTypes({
		formName: PropTypes.string.isRequired,
	})
);

export default enhance(Header);