import { axiosRequest } from "./config";
import * as LOGIN from "./actions/login";
import Login from "./components/Authentication/Login/Login";
import MainContainer from "./components/MainContainer/MainContainer";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  state = {
    route: null,
  };

  componentDidMount() {
    this.getMe();
  }

  getMe = async () => {
    const configuration = {
      path: "/api/v1/user/me",
      method: "get",
    };
    try {
      const response = await axiosRequest(configuration);
      if (
        response.status === 200 &&
        response.data.user &&
        response.data.user.id
      ) {
        this.setState(
          {
            route: "maincontainer",
          },
          () => this.props.loggedIn(response.data.user)
        );
      } else {
        this.setState({
          route: "login",
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        route: "login",
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.authenticated === false &&
      this.props.authenticated === true
    ) {
      this.getMe();
    } else if (
      prevProps.authenticated === true &&
      this.props.authenticated === false
    ) {
      this.setState({
        route: "login",
      });
    }
  }

  selectTab = () => {
    switch (this.state.route) {
      case "login":
        return <Login />;
      case "maincontainer":
        return <MainContainer />;

      default:
        return <div>APP</div>;
    }
  };
  render() {
    return this.selectTab();
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated || false,
  };
};

const dispatchPropsToState = (dispatch) => {
  return {
    loggedIn: (user) =>
      dispatch({
        type: LOGIN.USERDATA,
        payload: user,
      }),
  };
};

export default connect(mapStateToProps, dispatchPropsToState)(App);
