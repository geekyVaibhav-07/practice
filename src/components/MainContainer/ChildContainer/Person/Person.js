import React, { Component } from "react";
import "./person.css";
class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.info.avatar,
      email: props.info.email,
      firstname: props.info.firstname,
      id: props.info.id,
    };
  }
  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div className="person">
        <div className="person-image-container">
          <img
            className="person-image"
            src={`/assets/images/avatars/${this.state.avatar}.jpeg`}
            alt={this.state.avatar}
          ></img>
        </div>
        <div>
          <div>First Name</div>
          <div>{this.state.firstname}</div>
        </div>
        <div>
          <div>Last Name</div>
          <div>{this.state.lastname}</div>
        </div>
        <div>
          <div>Email</div>
          <div>{this.state.email}</div>
        </div>
      </div>
    );
  }
}

export default Person;
