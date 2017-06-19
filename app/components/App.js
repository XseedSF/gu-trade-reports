import React from "react";
import Header from "./Header";
import FormAnswers from "./FormAnswers";
import Filters from "./Filters";
import { AppContainer } from "../containers";
import { compose, lifecycle } from "recompose";
import "../App.css";
import "../fixed-data-table.css";
import { Route } from "react-router-dom";
import { TestDateSelector, Cycling } from "./TestDateSelector";

const App = props =>
  <div className="App">
    <Route
      exact={true}
      path="/test-date-selector"
      component={TestDateSelector}
    />
    <Route
      exact={true}
      path="/"
      render={() =>
        <div>
          <Header />
          <Filters />
          <FormAnswers />
        </div>}
    />
  </div>;

const withFetchForm = lifecycle({
  componentDidMount() {
    const filtersQuery = this.props.location.search;
    this.props.fetchForm(filtersQuery);
  }
});

export default compose(AppContainer, withFetchForm)(App);
