import React, { Component, useState, useEffect } from "react";
import Login from "./../Login/Login";
import App from "./../../../App";
import * as LOGIN from "./../../../actions/login";
import { connect } from "react-redux";
const Logout = (props) => {
  localStorage.removeItem("token");

  useEffect(() => {
    console.log("hook");
    localStorage.removeItem("token");
    props.dispatch({
      type: LOGIN.END_SESSION,
      payload: {},
    });
  });

  return null;
};

export default connect(null)(Logout);
