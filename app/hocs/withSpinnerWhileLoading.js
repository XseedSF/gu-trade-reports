import React from 'react';
import { branch, renderComponent } from 'recompose';
import { Spinner } from '../components';

const isLoading = ({ isLoading }) => isLoading;

const withSpinnerWhileLoading = branch(
	isLoading,
	renderComponent(Spinner),
);

export default withSpinnerWhileLoading;