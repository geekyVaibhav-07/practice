import React, { Component } from "react";
import { connect } from "react-redux";
import Logout from "../../Authentication/Logout/Logout";
import * as TAB from "./../../../actions/tab";
import "./topbar.css";
class TopBar extends Component {
  state = {
    active: "Home",
  };

  handleTabChange = (e) => {
    this.props.changeTab({ tab: e.target.innerHTML });
  };

  classGeneratorFOrTopBarComps = (key) => {
    return `topbar-topcomp ${this.state.active === key ? "topbar-active" : ""}`;
  };

  renderTabs = () => {
    return (
      <div className="topbar-topnav">
        <div
          className={this.classGeneratorFOrTopBarComps("Home")}
          onClick={this.handleTabChange}
        >
          Home
        </div>
        <div
          className={this.classGeneratorFOrTopBarComps("Profile")}
          onClick={this.handleTabChange}
        >
          Profile
        </div>
        <div
          className={this.classGeneratorFOrTopBarComps("Friends")}
          onClick={this.handleTabChange}
        >
          Friends
        </div>
        <div
          className={this.classGeneratorFOrTopBarComps("People")}
          onClick={this.handleTabChange}
        >
          People
        </div>
        <div
          className={
            this.classGeneratorFOrTopBarComps("Avatar") + " topbar-account"
          }
          onClick={this.handleTabChange}
        >
          Avatar
        </div>
        <div
          className={
            this.classGeneratorFOrTopBarComps("SignOut") + " topbar-account"
          }
          onClick={this.handleTabChange}
        >
          SignOut
        </div>
      </div>
    );
  };
  render() {
    return (
      <div>
        {this.renderTabs()}
        {this.state.active === "SignOut" ? <Logout /> : null}
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        active: this.props.tab,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    avatar: state.user.avatar,
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    tab: state.tab.tab,
  };
};

const dispatchPropsToState = (dispatch) => {
  return {
    changeTab: (data) =>
      dispatch({
        type: TAB.TABCHANGE,
        payload: data,
      }),
  };
};

export default connect(mapStateToProps, dispatchPropsToState)(TopBar);
