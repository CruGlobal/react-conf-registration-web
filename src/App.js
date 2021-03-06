import React, { Component } from "react";
// import styled from "@emotion/styled";
import { Route, Switch, withRouter } from "react-router-dom";
import LandingPage from "./Components/LandingPageComponents/LandingPage/LandingPage";
import HelpComponent from "./Components/HelpComponent/HelpComponent";
import AuthPage from "./Components/AuthComponent/AuthPage";
import Dashboard from "./Components/DashboardComponent/Dashboard";
import RegisterPage from "./Components/RegisterComponents/RegisterPage/RegisterPage";
import RegisterReviewPage from "./Components/RegisterComponents/RegisterReviewPage/RegisterReviewPage";

import { applicationInit, userLogin } from "./actions";

import { connect } from "react-redux";

class App extends Component {
  async componentDidMount() {
    // When the component mounts, check localstorage for a crsToken and set it our redux store
    await this.props.getCrsToken();
    // Then we will use the crsToken we set to get our users profile information
    this.props.setUserProfile(this.props.crsToken);
  }

  render() {
    const { loginState } = this.props;

    return (
      // This is where we do our routing
      // Dependent on the route, we will render the required component
      <Switch>
        <Route exact path="/" component={props => <LandingPage {...props} />} />

        <Route
          path="/help"
          component={(props, history) => (
            <HelpComponent signedIn={loginState} {...props} {...history} />
          )}
        />

        <Route
          path="/eventDashboard"
          component={props => <Dashboard {...props} />}
        />

        <Route
          exact
          path="/register/:confID/page/"
          component={(props, history) => (
            <RegisterPage {...props} {...history} />
          )}
        />

        <Route
          path="/register/:confID/page/:pageID/:regID"
          component={(props, history) => (
            <RegisterPage {...props} {...history} />
          )}
        />

        <Route
          exact
          path="/auth/"
          component={props => <AuthPage {...props} />}
        />

        <Route path="/auth/:id" component={props => <AuthPage {...props} />} />

        <Route
          path="/reviewRegistration/:confID"
          component={(props, history) => (
            <RegisterReviewPage {...props} {...history} />
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    crsToken: state.authenticationReducer.crsToken,
    loginState: state.authenticationReducer.loginState,
    profile: state.authenticationReducer.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setUserProfile: accessToken => {
      dispatch(userLogin(accessToken));
    },
    getCrsToken: () => {
      dispatch(applicationInit());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
