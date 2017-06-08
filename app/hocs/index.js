import React from 'react';
import { branch, renderComponent } from 'recompose';
import Spinner from './Spinner';

const isLoading = ({ isLoading }) => isLoading;

const withSpinnerWhileLoading = branch(
	isLoading,
	renderComponent(Spinner),
);

export default withSpinnerWhileLoading;