import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
//import Description from './Description';

const Header = ({ formName }) => (
	<div>
		<Title> Analizar: {formName} </Title>
		<div className='site-description'>
			<p> Puedes aplicar filtros seleccionando barras o sectores de las gráficas, y estos se irán acumulando.
			Al aplicar un filtro sobre una pregunta, la gráfica de esta pregunta no será filtrada.
			En el caso de las gráficas de barras puedes elegir más de una opción para incluir más respuestas.
			</p>
		</div>
	</div>
)

Header.propTypes = {
	formName: PropTypes.string.isRequired,
}

export default Header;