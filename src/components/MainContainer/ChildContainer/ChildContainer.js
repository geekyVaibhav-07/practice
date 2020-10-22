import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import People from "./People/People";
import Friends from "./Friends/Friends";
class ChildContainer extends Component {
  state = {
    active: "Home",
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.tab !== this.state.active) {
      this.setState({
        active: this.props.tab,
      });
    }
  }

  renderTab = () => {
    switch (this.state.active) {
      case "Home":
        return <Home />;
      case "Friends":
        return <Friends />;
      case "Profile":
        return <Profile />;
      case "People":
        return <People />;
      default:
        return <Home />;
    }
  };
  render() {
    return <div>{this.renderTab()}</div>;
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

export default connect(mapStateToProps, null)(ChildContainer);
