import React, { Component } from "react";
import * as LOGIN from "./../../../actions/login";
import axios from "axios";
import { axiosRequest } from "../../../config/index";
import { connect } from "react-redux";
import "./login.css";
class Login extends Component {
  state = {
    email: null,
    password: null,
    messgae: null,
  };

  componentDidMount() {
    localStorage.removeItem("token");
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCreateUser = async (e) => {
    e.preventDefault();
    const data = {
      email: this.state.new_email,
      password: this.state.new_password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      avatar: this.state.avatar,
    };
    const configuration = {
      path: "/api/v1/user/",
      data,
      method: "post",
    };
    try {
      const response = await axiosRequest(configuration);
      console.log(response);
      if (response.status === 201) {
        this.setState({
          create_user_message: "User has been created !!!",
          new_email: null,
          new_password: null,
          firstname: null,
          lastname: null,
          avatar: null,
        });
      } else {
        this.setState({
          create_user_message: "Email/password is incorrect",
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        create_user_message: "Something Went Wrong !!!",
      });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const configuration = {
      path: "/api/v1/user/login",
      data,
      method: "post",
    };
    try {
      const response = await axiosRequest(configuration);
      console.log(response);
      if (response.status === 200 && response.data.token) {
        const token = localStorage.setItem("token", response.data.token);
        const authToken = token || localStorage.getItem("token");
        axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
        console.log(this.props);
        this.props.loggedIn();
      } else {
        this.setState({
          message: "Email/password is incorrect",
        });
      }
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({
          message: "Email/password is incorrect",
        });
      } else {
        console.log(err);
      }
    }
  };

  renderUserCreationForm = () => {
    return (
      <div>
        <form>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="new_email"
              value={this.state.new_email || ""}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              value={this.state.firstname || ""}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={this.state.lastname || ""}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Avatar</label>
            <input
              type="text"
              name="avatar"
              value={this.state.avatar || ""}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <div>
              <label>Passowrd</label>
              <input
                type="password"
                name="new_password"
                value={this.state.new_password || ""}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" onClick={this.handleCreateUser}>
              Signup
            </button>
          </div>
        </form>
        {this.state.create_user_message ? (
          <div>{this.state.create_user_message}</div>
        ) : null}
      </div>
    );
  };

  renderLoginForm = () => {
    return (
      <div>
        <form>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={this.state.email || ""}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Passowrd</label>
            <input
              type="password"
              name="password"
              value={this.state.password || ""}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit" onClick={this.handleSubmit}>
              Login
            </button>
          </div>
        </form>
        {this.state.message ? <div>{this.state.message}</div> : null}
      </div>
    );
  };
  render() {
    return (
      <div>
        <div className="Login-login">{this.renderLoginForm()}</div>
        <div classname="Login-login">{this.renderUserCreationForm()}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggedIn: () =>
      dispatch({
        type: LOGIN.AUTHENTICATED,
        payload: {},
      }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
