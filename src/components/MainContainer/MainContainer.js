import React, { Component } from "react";
import TopBar from "./TopBar/TopBar";
import ChildContainer from "./ChildContainer/ChildContainer";
class MainContainer extends Component {
  state = {};
  render() {
    return (
      <>
        <div>
          <TopBar />
        </div>
        <div>
          <ChildContainer />
        </div>
      </>
    );
  }
}

export default MainContainer;
